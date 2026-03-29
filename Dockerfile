FROM mcr.microsoft.com/playwright:v1.58.2-noble

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

RUN apt-get update && apt-get install -y default-jre wget && \
    ALLURE_VERSION="2.27.0" && \
    wget -qO /tmp/allure.tgz "https://github.com/allure-framework/allure2/releases/download/${ALLURE_VERSION}/allure-${ALLURE_VERSION}.tgz" && \
    tar -xzf /tmp/allure.tgz -C /opt/ && \
    ln -sf "/opt/allure-${ALLURE_VERSION}/bin/allure" /usr/local/bin/allure && \
    rm /tmp/allure.tgz

COPY . .

CMD ["npx", "playwright", "test", "--project=chromium", "--grep-invert", "@visual"]
