#!/bin/bash
docker build -t mjsouthcott/safety-zone .
docker push mjsouthcott/safety-zone

ssh deploy@$DEPLOY_SERVER << EOF
docker pull mjsouthcott/safety-zone
docker stop safety-zone || true
docker rm safety-zone || true
docker rmi mjsouthcott/safety-zone:current || true
docker tag mjsouthcott/safety-zone:latest mjsouthcott/safety-zone:current
docker run -d --restart always --name safety-zone -p 3000:3000 mjsouthcott/safety-zone:current
EOF
