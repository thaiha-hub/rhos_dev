## About the Containerfiles

I included the two Containerfiles only to show how the container images for the
`times-app` and `cities-app` could be built.

I did not build the images myself for this assignment.
Instead, I used prebuilt images so I could focus on learning how containers
communicate with each other using DNS.

The `app/` folder with source code is therefore not included in this repository.

## Steps to run apps from existing images

``bash
#Create a network (DNS enabled)
podman network create cities-net

#Run times-app
podman run -d \
    --name times-app \
    --network cities-net \
    -p 8080:8080 \
     quay.io/redhattraining/podman-info-times:v0.1
#test the times app (inside the network)
podman run --rm \
    --network cities-net \
    curlimages/curl:latest \
    http://times-app:8080/times/BKK

#start a cities-app
podman run -d \
    --name cities-app \
    --network cities-net \
    -p 8090:8090 \
    -e TIMES_APP_URL=http://times-app:8080/times \
    quay.io/redhattraining/podman-info-cities:v0.1

#test if apps running
podman ps 

#test the cities service
curl http://localhost:8090/cities/MAD

#clean up 
podman stop times-app cities-app
podman rm times-app cities-app
podman network rm cities-net
```

