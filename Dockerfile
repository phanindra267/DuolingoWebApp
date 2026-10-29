# ---- build stage: compile the Go binary ----
FROM golang:1.23-alpine AS build
WORKDIR /src

# Copy the module file first so dependency download is cached separately.
COPY go.mod ./
RUN go mod download

COPY . .
# CGO_ENABLED=0 -> fully static binary, so it can run on a distroless/scratch base.
RUN CGO_ENABLED=0 GOOS=linux go build -trimpath -ldflags="-s -w" -o /out/app .

# ---- runtime stage: tiny image with only the binary ----
FROM gcr.io/distroless/static-debian12:nonroot
COPY --from=build /out/app /app
EXPOSE 8080
USER nonroot:nonroot
ENTRYPOINT ["/app"]
