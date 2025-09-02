'''
Author: lee 497232807@qq.com
Date: 2025-08-27 09:56:28
LastEditors: lee 497232807@qq.com
LastEditTime: 2025-08-27 17:56:29
FilePath: \多语言xml翻译\Test.py
Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
'''

import os


os.environ["translators_default_region"] = "EN"
import translators as ts

q_text = '季姬寂，集鸡，鸡即棘鸡。棘鸡饥叽，季姬及箕稷济鸡。'
q_html = '''<!DOCTYPE html><html><head><title>《季姬击鸡记》</title></head><body><p>还有另一篇文章《施氏食狮史》。</p></body></html>'''

### usage
# _ = ts.preaccelerate_and_speedtest()  # Optional. Caching sessions in advance, which can help improve access speed.

# print(ts.translators_pool)
print(ts.translate_text(q_text,"alibaba"))
# print(ts.translate_html(q_html, translator='alibaba'))

### parameters
# help(ts.translate_text)

"""
translate_text(query_text: str, translator: str = 'bing', from_language: str = 'auto', to_language: str = 'en', **kwargs) -> Union[str, dict]
    :param query_text: str, must.
    :param translator: str, default 'alibaba'.
    :param from_language: str, default 'auto'.
    :param to_language: str, default 'en'.
    :param if_use_preacceleration: bool, default False.
    :param **kwargs:
            :param is_detail_result: bool, default False.
            :param http_client: str, default 'requests' (except reverso). Union['requests', 'niquests', 'httpx', 'cloudscraper']
            :param professional_field: str, default None. Support alibaba(), baidu(), caiyun(), cloudTranslation(), elia(), sysTran(), youdao(), volcEngine() only.
            :param timeout: Optional[float], default None.
            :param proxies: Optional[dict], default None.
            :param sleep_seconds: float, default 0.
            :param update_session_after_freq: int, default 1000.
            :param update_session_after_seconds: float, default 1500.
            :param if_use_cn_host: bool, default False. Support google(), bing() only.                
            :param reset_host_url: str, default None. Support google(), yandex() only.
            :param if_check_reset_host_url: bool, default True. Support google(), yandex() only.
            :param if_ignore_empty_query: bool, default False.
            :param limit_of_length: int, default 20000.
            :param if_ignore_limit_of_length: bool, default False.
            :param if_show_time_stat: bool, default False.
            :param show_time_stat_precision: int, default 2.
            :param if_print_warning: bool, default True.
            :param lingvanex_mode: str, default 'B2C', choose from ("B2C", "B2B").
            :param myMemory_mode: str, default "web", choose from ("web", "api").
    :return: str or dict
"""