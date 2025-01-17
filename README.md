# grpc-todo

This is designed to show how to do basic gRPC between a web browser and
a server. It uses envoy as the proxy to convert from GRPC-WEB or JSON to GRPC.

## Running

The fastest way to get all of the components up and running is via the included `docker-compose` setup.  

- `docker-compose build`
- `docker-compose up`

### Build and run locally

If you're more for playing around without having to go through the world of docker.  You need three windows open and can run each of these commands.  *Note: Skipping over the npm install in the directories*

- `cd go-server ; go run server.go`  or `cd ts-server ; npm start`
- `cd ts-client-react ; npm start`
- `cd envoy ; envoy -c envoy.yaml`
- Open browser on port specificed (localhost:1234)

### Building the protobuf / gRPC definitions

Base requirements:
* OSX: `brew install protobuf`
* Linux: install protobuf (via your favorite package manager)

Protobuf files (which are checked into the repo, but if you're changing things)

`cd protos ; make`

The directory `google/api` was created by:

    mkdir -p google/api
    cd protos/google/api
    wget https://raw.githubusercontent.com/googleapis/googleapis/master/google/api/annotations.proto
    wget https://raw.githubusercontent.com/googleapis/googleapis/master/google/api/http.proto

## References

- [A TODO app using grpc-web and Vue.js](https://medium.com/@aravindhanjay/a-todo-app-using-grpc-web-and-vue-js-4e0c18461a3e)
- https://medium.com/@amsokol.com/tutorial-part-3-how-to-develop-go-grpc-microservice-with-http-rest-endpoint-middleware-739aac8f1d7e

### Graveyard of notes

#### Install Protobuf Generator for Go

```console
go get -u github.com/golang/protobuf/protoc-gen-go
```

#### Install Protobuf Generator for Web

```console
git clone https://github.com/grpc/grpc-web /tmp/grpc-web
cd /tmp/grpc-web && sudo make install-plugin
rm -rf /tmp/grpc-web
cd -
```