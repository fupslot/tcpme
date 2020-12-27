
### Create the CA Key and Certificate for signing Client Certs
```bash
openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:4096 -keyout ca.key -out ca.crt
```

### Create the Server Key, CSR, and Certificate
```bash
openssl genrsa -out server.key 2048
```
```bash
openssl req -new -key server.key -out server.csr
```

### We're self signing our own server cert here. This is a no-no in production.
```bash
openssl x509 -req -days 365 -in server.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out server.crt
```

### Create the Client Key and CSR
```bash
openssl genrsa -out client.key 2048
```

```bash
openssl req -new -key client.key -out client.csr
```

### OCSP Request
ocsp_request.der can be generated beforehand by using openssl
```bash
openssl ocsp -issuer ca.crt -cert server.crt -reqout ocsp.req.der
```

### Sign the client certificate with our CA cert.  Unlike signing our own server cert, this is what we want to do.
### Serial should be different from the server one, otherwise curl will return NSS error -8054
```bash
openssl x509 -req -days 31 -in client.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out client.crt
```

### Verify Server Certificate
```bash
openssl verify -purpose sslserver -CAfile ca.crt server.crt
```

### Verify Client Certificate
```bash
openssl verify -purpose sslclient -CAfile ca.crt client.crt
```

### Convert PEM to PFX
```bash
openssl pkcs12 -export -out certificate.pfx -inkey privateKey.key -in certificate.crt -certfile CAcert.crt
```
