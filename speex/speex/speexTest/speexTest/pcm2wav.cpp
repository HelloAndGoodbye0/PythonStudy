#include <stdio.h>
#include <string.h>
#include <speex/speex.h>
#define FRAME_SIZE 160

//speex ��Ƶ���� ���� ����

typedef struct WAVE_HEADER {
	char    fccID[4];       //����Ϊ""RIFF
	unsigned int dwSize;   //�����д��WAVE��ʽ��Ƶ�Ĵ�С
	char    fccType[4];     //����Ϊ"WAVE"
}WAVE_HEADER;

typedef struct WAVE_FMT {
	char    fccID[4];          //����Ϊ"fmt "
	unsigned int  dwSize;     //����ΪWAVE_FMTռ���ֽ�����Ϊ16
	unsigned short wFormatTag; //���ΪPCM����ֵΪ 1
	unsigned short wChannels;  //ͨ��������ͨ��=1��˫ͨ��=2
	unsigned int  dwSamplesPerSec;//����Ƶ��
	unsigned int  dwAvgBytesPerSec;/* ==dwSamplesPerSec*wChannels*uiBitsPerSample/8 */
	unsigned short wBlockAlign;//==wChannels*uiBitsPerSample/8
	unsigned short uiBitsPerSample;//ÿ���������bit����8bits=8, 16bits=16
}WAVE_FMT;

typedef struct WAVE_DATA {
	char    fccID[4];       //����Ϊ"data"
	unsigned long dwSize;   //==NumSamples*wChannels*uiBitsPerSample/8
}WAVE_DATA;


//pcm�ļ�����
//inFile ����pcm�ļ�
//outFile ���������ļ� 
int pcm_encode(char *inFile, char *outFile) {

	FILE *fin;
	FILE *fout;
	short in[FRAME_SIZE];
	float input[FRAME_SIZE];
	char cbits[200];
	int nbBytes;
	/*Holds the state of the encoder*/
	void *state;
	/*Holds bits so they can be read and written to by the Speex routines*/
	SpeexBits bits;
	int i, tmp;

	/*Create a new encoder state in narrowband mode*/
	state = speex_encoder_init(&speex_nb_mode);

	/*Set the quality to 8 (15 kbps)*/
	tmp = 8;
	speex_encoder_ctl(state, SPEEX_SET_QUALITY, &tmp);


	fin = fopen(inFile, "rb");
	if(fin==nullptr)
	{
		printf("PCM�ļ�������\n");
		return -1;
	}


	fout = fopen(outFile, "wb");
	/*Initialization of the structure that holds the bits*/
	speex_bits_init(&bits);
	while (1)
	{
		/*Read a 16 bits/sample audio frame*/
		fread(in, sizeof(short), FRAME_SIZE, fin);
		if (feof(fin))
			break;
		/*Copy the 16 bits values to float so Speex can work on them*/
		for (i = 0; i < FRAME_SIZE; i++)
			input[i] = in[i];

		/*Flush all the bits in the struct so we can encode a new frame*/
		speex_bits_reset(&bits);

		/*Encode the frame*/
		speex_encode(state, input, &bits);
		/*Copy the bits to an array of char that can be written*/
		nbBytes = speex_bits_write(&bits, cbits, 200);

		/*Write the size of the frame first. This is what sampledec expects but
		it's likely to be different in your own application*/
		fwrite(&nbBytes, sizeof(int), 1, fout);
		/*Write the compressed data*/
		fwrite(cbits, 1, nbBytes, fout);

	}

	/*Destroy the encoder state*/
	speex_encoder_destroy(state);
	/*Destroy the bit-packing struct*/
	speex_bits_destroy(&bits);
	fclose(fin);
	fclose(fout);

	return 0;
}

//���ܺ��pcm
//inFile ��������ļ�
//outFile ����ļ�
int pcm_decode(char *inFile, char *outFile)
{
	//char *outFile;
	FILE *fout;
	/*Holds the audio that will be written to file (16 bits per sample)*/
	short out[FRAME_SIZE];
	/*Speex handle samples as float, so we need an array of floats*/
	float output[FRAME_SIZE];
	char cbits[200];
	int nbBytes;
	/*Holds the state of the decoder*/
	void *state;
	/*Holds bits so they can be read and written to by the Speex routines*/
	SpeexBits bits;
	int i, tmp;

	/*Create a new decoder state in narrowband mode*/
	state = speex_decoder_init(&speex_nb_mode);

	/*Set the perceptual enhancement on*/
	tmp = 1;
	speex_decoder_ctl(state, SPEEX_SET_ENH, &tmp);
	speex_decoder_ctl(state, SPEEX_SET_QUALITY, &tmp);

	fout = fopen(outFile, "wb");
	FILE* fin = fopen(inFile, "rb");
	/*Initialization of the structure that holds the bits*/
	speex_bits_init(&bits);
	while (1)
	{
		/*Read the size encoded by sampleenc, this part will likely be
		different in your application*/
		fread(&nbBytes, sizeof(int), 1, fin);
		fprintf(stderr, "nbBytes: %d\n", nbBytes);
		if (feof(fin))
			break;

		/*Read the "packet" encoded by sampleenc*/
		fread(cbits, 1, nbBytes, fin);
		/*Copy the data into the bit-stream struct*/
		speex_bits_read_from(&bits, cbits, nbBytes);

		/*Decode the data*/
		speex_decode(state, &bits, output);

		/*Copy from float to short (16 bits) for output*/
		for (i = 0; i<FRAME_SIZE; i++)
			out[i] = output[i];

		/*Write the decoded audio to file*/
		fwrite(out, sizeof(short), FRAME_SIZE, fout);

	}

	/*Destroy the decoder state*/
	speex_decoder_destroy(state);
	/*Destroy the bit-stream truct*/
	speex_bits_destroy(&bits);
	fclose(fout);
	fclose(fin);

	return 0;
}


/**
* Convert PCM16LE raw data to WAVE format
* @param pcmpath       Input PCM file.
* @param bits		   PCM bits
* @param channels      Channel number of PCM file.
* @param sample_rate   Sample rate of PCM file.
* @param wavepath      Output WAVE file.
*/
int pcm_to_wave( char *pcmpath, int bits, int channels, int sample_rate,  char *wavepath)
{


	WAVE_HEADER pcmHEADER;
	WAVE_FMT    pcmFMT;
	WAVE_DATA   pcmDATA;

	unsigned short m_pcmData;
	FILE *fp, *fpout;

	fp = fopen(pcmpath, "rb+");
	if (fp == NULL)
	{
		printf("Open pcm file error.\n");
		return -1;
	}
	fpout = fopen(wavepath, "wb+");
	if (fpout == NULL)
	{
		printf("Create wav file error.\n");
		return -1;
	}

	/* WAVE_HEADER */
	memcpy(pcmHEADER.fccID, "RIFF", strlen("RIFF"));
	memcpy(pcmHEADER.fccType, "WAVE", strlen("WAVE"));
	fseek(fpout, sizeof(WAVE_HEADER), 1);   //1=SEEK_CUR
											/* WAVE_FMT */
	memcpy(pcmFMT.fccID, "fmt ", strlen("fmt "));
	pcmFMT.dwSize = 16;
	pcmFMT.wFormatTag = 1;
	pcmFMT.wChannels = channels;
	pcmFMT.dwSamplesPerSec = sample_rate;
	pcmFMT.uiBitsPerSample = bits;
	/* ==dwSamplesPerSec*wChannels*uiBitsPerSample/8 */
	pcmFMT.dwAvgBytesPerSec = pcmFMT.dwSamplesPerSec*pcmFMT.wChannels*pcmFMT.uiBitsPerSample / 8;
	/* ==wChannels*uiBitsPerSample/8 */
	pcmFMT.wBlockAlign = pcmFMT.wChannels*pcmFMT.uiBitsPerSample / 8;


	fwrite(&pcmFMT, sizeof(WAVE_FMT), 1, fpout);

	/* WAVE_DATA */
	memcpy(pcmDATA.fccID, "data", strlen("data"));
	pcmDATA.dwSize = 0;
	fseek(fpout, sizeof(WAVE_DATA), SEEK_CUR);

	fread(&m_pcmData, sizeof(unsigned short), 1, fp);
	while (!feof(fp))
	{
		pcmDATA.dwSize += 2;
		fwrite(&m_pcmData, sizeof(unsigned short), 1, fpout);
		fread(&m_pcmData, sizeof(unsigned short), 1, fp);
	}

	/*pcmHEADER.dwSize = 44 + pcmDATA.dwSize;*/
	//�޸�ʱ�䣺2018��1��5��
	pcmHEADER.dwSize = 36 + pcmDATA.dwSize;

	rewind(fpout);
	fwrite(&pcmHEADER, sizeof(WAVE_HEADER), 1, fpout);
	fseek(fpout, sizeof(WAVE_FMT), SEEK_CUR);
	fwrite(&pcmDATA, sizeof(WAVE_DATA), 1, fpout);

	fclose(fp);
	fclose(fpout);

	return 0;
}

int main(int argc, char **argv)
{
	char *pcmfile = argv[1];
	char *encode_pcmfile = "3_encode";
	char *decode_pcmfile = "3_decode.pcm";
	char *wavfile = "3.wav";
	if (pcmfile)
	{
		int b = pcm_encode(pcmfile, encode_pcmfile);
		int result = pcm_decode(encode_pcmfile, decode_pcmfile);
		if (result == 0)
		{
			pcm_to_wave(decode_pcmfile, 16, 1, 8000, wavfile);
		}
	}
	

	return 0;
}