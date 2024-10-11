FROM node:20-bullseye

ENV NODE_PATH=/usr/local/lib/node_modules/
ENV CUSTOM_CHROME_PATH=/usr/bin/chromium

RUN apt-get update && apt-get install curl gnupg -y \
  && curl --location --silent https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
  && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
  && apt-get update \
  && apt-get install chromium -y --no-install-recommends \
  && rm -rf /var/lib/apt/lists/*

RUN npm install -g "eslint@8.57.0" \
  "@typescript-eslint/eslint-plugin@7.18.0" \
  "@typescript-eslint/parser@7.18.0" \ 
  "eslint-plugin-functional@^6.0.0" \
  "eslint-plugin-import@2.29.0" \
  "eslint-plugin-promise@^6.1.1" \
  "eslint-plugin-sonarjs@^0.22.0" \ 
  "eslint-plugin-unicorn@55.0.0" \
  "vscode-material-icons@0.1.1" \
  "eslint-config-airbnb@19.0.4" \
  "eslint-config-next@14.2.3" \
  "eslint-config-prettier@9.1.0" \ 
  "eslint-plugin-storybook@0.8.0" \ 
  "eslint-plugin-fp@2.3.0" \
  "eslint-plugin-prefer-arrow@1.2.3" \
  "eslint-import-resolver-typescript-bun@0.0.104"

RUN npm install -g \
  "@code-pushup/coverage-plugin@^0.49.0" \
  "@code-pushup/js-packages-plugin@^0.49.0" \
  "@code-pushup/lighthouse-plugin@^0.49.0" \
  "@code-pushup/models@^0.49.0" \
  "@code-pushup/eslint-config@^0.8.0" \
  "@code-pushup/eslint-plugin@^0.50.0"

RUN npm install -g "@code-pushup/cli@^0.50.0"


WORKDIR /app
