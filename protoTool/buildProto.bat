@echo off
SET protoc="proto/protoc.exe"
SET protoDIr="proto\*.proto"

@REM protoc.exe --descriptor_set_out 666.pb *.proto
%protoc% --descriptor_set_out proto.pb %protoDIr%

@REM �ƶ���resĿ¼����
move proto.pb res/proto.pb
echo "build proto success=============="

pause
