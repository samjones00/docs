## Troubleshooting

### `web` tool not in path

If after installing the `dotnet` web tool, it fails with `bash: web: command not found` you'll need to add it to your `PATH` which you
can do in Linux by adding it to your PATH, e.g:

    $ echo "export PATH=\$HOME/.dotnet/tools:\$PATH" >> ~/.bashrc
    $ . ~/.bashrc
    
### SSL Connection Errors

To resolve SSL Connection errors you can try [commenting out ssl_conf = ssl_sect](https://github.com/dotnet/corefx/issues/33179#issuecomment-435118249), e.g:

    $ sudo vi /etc/ssl/openssl.cnf

Comment out line in `vi`, write changes and quit:

    :%s/^ssl_conf/#&/
    :wq

If that doesn't resolve the issue you can try [updating the local ca-certificates](https://github.com/dotnet/corefx/issues/30147#issuecomment-410526404):

    $ sudo update-ca-certificates --fresh

Or try [updating the SSL_CERT Environment variables](https://github.com/dotnet/core/issues/1941#issuecomment-421387136) before running the tool again:

    export SSL_CERT_FILE=/etc/ssl/certs/ca-certificates.crt
    export SSL_CERT_DIR=/dev/null

Finally you can run the `web` tool with the `--ignore-ssl-errors` switch, e.g:

    $ web new vue-lite VueLite --ignore-ssl-errors

{% capture trouble %}{% include web-trouble.md %}{% endcapture %}
{{ trouble | markdownify }}