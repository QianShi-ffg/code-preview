FROM nginx:latest

# ����Ŀ��Ŀ¼��dist�ļ����µ������ļ����Ƶ������� /usr/share/nginx/html/ Ŀ¼��
COPY dist/ /usr/share/nginx/html/
COPY default.conf /etc/nginx/conf.d/default.conf