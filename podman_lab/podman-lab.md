# podman_lab  
``bash
#create a network
podman network create lab-net
podman network ls

#start web server
podman run -d \
  --name podman-web \
  --network lab-net \
  -p 8080:8080 \
  registry.access.redhat.com/ubi9/httpd-24

podman ps

#copy file into container
podman cp index.html podman-web:/var/www/html/index.html
podman exec podman-web ls /var/www/html
podman exec podman-web cat /var/www/html/index.html

#test access from local machine
podman exec podman-web ls /var/www/html

#start client machine
podman run -d \
  --name podman-client \
  --network lab-net \
  registry.access.redhat.com/ubi9/httpd-24

podman ps

#test communication btw 2 containers
podman exec podman-client curl http://podman-web:8080

#copy a file from a container to local host
podman exec podman-client sh -c 'echo "Hello from container" > /tmp/message.txt'
podman cp podman-client:/tmp/message.txt ./message.txt

cat message.txt

