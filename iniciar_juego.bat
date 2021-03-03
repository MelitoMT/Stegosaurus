set url="localhost:8123"

start "server" "server/Apache24/bin/httpd.exe" 
start chrome http://%url%