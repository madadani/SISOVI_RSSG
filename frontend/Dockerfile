FROM almalinux:9 AS base

RUN dnf -y install curl-minimal ca-certificates && \
	curl -fsSL https://rpm.nodesource.com/setup_20.x | bash - && \
	dnf -y install nodejs && \
	dnf clean all

WORKDIR /app

COPY package*.json ./
RUN npm install --no-audit --no-fund

COPY . .

ARG VITE_API_URL=http://192.168.100.9:8002/api
ENV VITE_API_URL=${VITE_API_URL}

RUN npm run build

EXPOSE 3014

CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "3014"]
