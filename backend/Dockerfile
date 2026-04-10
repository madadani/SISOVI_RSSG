FROM almalinux:9 AS base

RUN dnf -y install curl-minimal ca-certificates python3 make gcc-c++ && \
	curl -fsSL https://rpm.nodesource.com/setup_20.x | bash - && \
	dnf -y install nodejs && \
	dnf clean all

WORKDIR /app

COPY package*.json ./
RUN npm install --no-audit --no-fund

COPY tsconfig.json ./
COPY prisma ./prisma
COPY src ./src

RUN npx prisma generate && npm run build

ENV NODE_ENV=production
ENV PORT=8002

EXPOSE 8002

CMD ["sh", "-c", "npx prisma db push && npm run start"]
