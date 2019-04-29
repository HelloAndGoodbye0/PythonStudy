#!/usr/bin/python
# -*- coding: UTF-8 -*-
    
from cqhttp import CQHttp, Error
import getCityWeater
import TuLinAI




bot = CQHttp(api_root='http://127.0.0.1:5700/',
             access_token='123',
             secret='123')


@bot.on_message()
def handle_msg(context):

    # 下面这句等价于 bot.send_private_msg(user_id=context['user_id'], message='你好呀，下面一条是你刚刚发的：')
    print("handle_msg",context)
    if "group_id" in context and context["group_id"] != 876746591:
    	return

    message = context['message']
    if message.find("天气：")!=-1:
    	message= message.split("：")[1]
    	code = getCityWeater.GetCityCode(message)
    	if code!=None:
            bot.send(context, (getCityWeater.GetWeatherByCode(code)))
    	else:
            bot.send(context, "我没找到~~~~所查询的城市")
    else:
    	# print("AI--",TuLinAI.GetAIResponce(message))
    	bot.send(context, TuLinAI.GetAIResponce(message))



@bot.on_notice('group_increase')  # 如果插件版本是 3.x，这里需要使用 @bot.on_event
def handle_group_increase(context):
    info = bot.get_group_member_info(group_id=context.group_id,
                                     user_id=context.user_id)
    nickname = info['nickname']
    name = nickname if nickname else '新人'
    bot.send(context, message='欢迎{}～'.format(name))


@bot.on_request('group')
def handle_group_request(context):
    if context['comment'] != 'some-secret':
        # 如果插件版本是 3.x，这里需要使用 context.message
        # 验证信息不符，拒绝
        return {'approve': False, 'reason': '你填写的验证信息有误'}
    return {'approve': True}

def Sendweater():
	code = getCityWeater.GetCityCode("成都")
	if code!=None:
		bot.send_group_msg(group_id = 876746591,message = getCityWeater.GetWeatherByCode(code))

def sendMessageToUser(user_id,message):
	bot.send_private_msg(user_id=user_id, message=message)

def sendMessageToGroup(group_id,message):
	bot.send_group_msg(group_id = group_id,message = message)


# sendMessageToUser(user_id=497232807, message='你好～')
# sendMessageToGroup(group_id = 876746591,message = "****")

bot.run(host='127.0.0.1', port=8080)

