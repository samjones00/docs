for fname in *.html; do
  name="${fname%\.*}"
  extension="${fname#$name}"
  newname="${name//_/.}"
  newfname="$newname""$extension"
  if [ "$fname" != "$newfname" ]; then
    #echo cp "$fname" "$newfname"
    cp "$fname" "$newfname"
  fi
done
