# tmte4pt-docker

This contains a dockerized version of the [tmte4pt](https://github.com/schutzwerk/tmte4pt) project.

## Starting and building
If you have the `Makefile` of the *tmte4pt* repository you can use `make build` and `make run` to build the image and run the container. Please note that there's an automated build process in place that pushes the newest version of this project to [Docker Hub](https://hub.docker.com/r/schutzwerk/tmte4pt/), so `make build` is not a strict requirement. To use the pre-built image, invoke `docker pull schutzwerk/tmte4pt` followed by a `docker run` command. This command can be generated and executed automatically when using `make run`.

You can also use the following commands to get the image and run the container manually. Please make sure to apply the required changes according to your desired setup:

```
$ docker pull schutzwerk/tmte4pt # Pull the image
$ docker run \
	-it \
	--name tmte4pt \
        -p 127.0.0.1:8080:8080 \
	schutzwerk/tmte4pt:latest
```
