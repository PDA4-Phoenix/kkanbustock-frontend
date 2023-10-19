#!/bin/bash

#파라미터 개수 체크
if [ $# -eq 1 ]; then
  APPLY=${1}
fi

ECR_REPOSITORY="team-4" # AWS ECR repository 이름 넣는다
APP="client-app"
NAMESPACE="team-4" # 배포할때 사용되는 애다. eks에 있는 애다.

DATETIME=`date '+%Y%m%d%H%M%S'` # 태그 구분하기위해서 임의로 지정해둔거다.
TAG=${APP}-${DATETIME}

IMAGE=${ECR_REPOSITORY}:${TAG}
DOCKERPATH=./Dockerfile # 도커파일

AWS_PROFILE=eks-admin # 내 aws credential profile
AWS_REGION=ap-northeast-2

export AWS_DEFAULT_PROFILE=${AWS_PROFILE}
export AWS_DEFAULT_REGION=${AWS_REGION}
env | grep AWS

EKS_CLUSTER=shinhan-pda-cluster # eks 클러스터
rm -rf ./dist/*

# ==================
echo "aws eks login .."
# ==================
aws eks --region ${AWS_REGION} update-kubeconfig --name ${EKS_CLUSTER} --profile ${AWS_PROFILE}

# ==================
echo "aws ecr login .."
# ==================
env | grep AWS
aws ecr get-login-password --region  ${AWS_REGION} | docker login --username AWS --password-stdin 686710509719.dkr.ecr.ap-northeast-2.amazonaws.com # ECR URL 계정으로 들어가는거다 특정 team-4가아니라

# ==================
echo "docker build .."
# ==================
sudo docker build --platform=linux/amd64 -t ${IMAGE} . ## 맥이니까 --platform 붙인거다.

# ==================
echo "docker tagging .."
# ==================
docker tag ${IMAGE} 686710509719.dkr.ecr.ap-northeast-2.amazonaws.com/${IMAGE}

# ==================
echo "docker push .."
# ==================
docker push 686710509719.dkr.ecr.ap-northeast-2.amazonaws.com/${IMAGE} # ECR의 URL에 배포 (AWS 만의 도커 허브라고 생각하자)

if [ "$APPLY" == "deploy" ]; then
	echo "----------${IMAGE}----------"
	kubectl config set-context $(kubectl config current-context) --namespace=${NAMESPACE}
	kubectl set image deployment/${APP} ${APP}=686710509719.dkr.ecr.ap-northeast-2.amazonaws.com/${IMAGE} --namespace=${NAMESPACE}
	kubectl --namespace ${NAMESPACE} rollout status deployment.v1.apps/${APP}
	kubectl get pod,svc,hpa,ingress -o wide --namespace=${NAMESPACE}
	echo "------------------------------"
fi
