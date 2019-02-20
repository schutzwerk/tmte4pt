FROM ubuntu:18.04
LABEL maintainer "Philipp Schmied <pschmied@schutzwerk.com>"

# Install dependencies
RUN apt-get update && \
    apt-get -y install \
    git-core \
    npm \
    python

# Clone the repository
RUN git clone https://github.com/schutzwerk/tmte4pt /opt/tmte4pt

# Run npm installation
RUN cd /opt/tmte4pt && \
    npm install

WORKDIR /opt/tmte4pt
ENV HOST "0.0.0.0"
CMD ["npm", "run", "dev"]
