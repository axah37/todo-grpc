GO_SERVER=../go-server
TS_SERVER=../ts-server
JS_CLIENT=../js-client-vue
TS_CLIENT=../ts-client-react
ENVOY_DIR=../envoy
PROTO_DIR=.

# git clone https://github.com/googleapis/googleapis
GOOGLEAPIS_DIR=../../googleapis/googleapis

all: clean gen

clean:
	rm -f $(GO_SERVER)/todo.pb.go $(GO_SERVER)/todo_grpc.pb.go
	rm -f $(JS_CLIENT)/src/models/todo_grpc_web_pb.js $(JS_CLIENT)/src/models/todo_pb.js
	rm -f $(TS_CLIENT)/src/models/todo_grpc_web_pb.js $(TS_CLIENT)/src/models/todo_pb.js
	rm -f $(TS_SERVER)/src/grpcjs/todo_grpc_web_pb.js $(TS_SERVER)/src/grpcjs/todo_pb.js

gen:
	#
	# Go Server
	#
	protoc \
		-I . -I protos \
		--proto_path=$(PROTO_DIR) \
		--go_out=$(GO_SERVER)/todo --go_opt=paths=source_relative \
		--go-grpc_out=$(GO_SERVER)/todo --go-grpc_opt=paths=source_relative \
		protos/todo.proto
	#
	# TS Server
	#     https://github.com/agreatfool/grpc_tools_node_protoc_ts/blob/master/examples/bash/build.sh
	$(TS_SERVER)/node_modules/.bin/grpc_tools_node_protoc \
		-I . -I protos \
		--js_out=import_style=commonjs,binary:$(TS_SERVER)/src/grpcjs \
		--grpc_out=grpc_js:$(TS_SERVER)/src/grpcjs \
		protos/todo.proto
	$(TS_SERVER)/node_modules/.bin/grpc_tools_node_protoc \
		-I . -I protos \
		--plugin=protoc-gen-ts=$(TS_SERVER)/node_modules/.bin/protoc-gen-ts \
		--ts_out=grpc_js:$(TS_SERVER)/src/grpcjs \
		protos/todo.proto
	protoc \
		-I . -I protos \
		--proto_path=$(PROTO_DIR) \
		--ts_proto_opt=outputServices=grpc-js \
		--ts_proto_opt=esModuleInterop=true \
		--plugin=$(TS_SERVER)/node_modules/.bin/protoc-gen-ts_proto \
		--ts_proto_out=import_style=commonjs,binary:$(TS_SERVER)/src/grpcjs/ \
		protos/todo.proto
	#
	# JS Client
	#
	protoc \
		-I . -I ./protos \
		--proto_path=$(PROTO_DIR) \
		--js_out=import_style=commonjs,binary:$(JS_CLIENT)/models/ \
		--grpc-web_out=import_style=commonjs,mode=grpcwebtext:$(JS_CLIENT)/models/ \
		protos/todo.proto
	#
	# TS Client
	#
	protoc \
		-I . -I ./protos \
		--proto_path=$(PROTO_DIR) \
		--ts_proto_opt=esModuleInterop=true \
		--plugin=$(TS_CLIENT)/node_modules/.bin/protoc-gen-ts_proto \
		--ts_proto_opt=outputClientImpl=grpc-web \
		--ts_proto_out=import_style=commonjs,binary:$(TS_CLIENT)/src/models/ \
		--plugin="protoc-gen-ts=${TS_CLIENT}/node_modules/.bin/protoc-gen-ts" \
		todo.proto

 		# --js_out=import_style=commonjs,binary:$(TS_CLIENT)/src/models/ \
		# --ts_out="service=grpc-web:$(TS_CLIENT)/src/models/" \
		# --plugin=$(TS_CLIENT)/node_modules/.bin/protoc-gen-ts_proto \

	# Envoy
	protoc \
		-I . -I ./protos \
		--include_imports --include_source_info \
		--descriptor_set_out=$(ENVOY_DIR)/todo.pb \
		protos/todo.proto
