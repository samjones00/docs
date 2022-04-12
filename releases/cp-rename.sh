for fname in *.html; do
  name="${fname%\.*}"
  extension="${fname#$name}"
  newname="${name//_/.}"
  newfname="$newname""$extension"
  if [ "$fname" != "$newfname" ]; then
    #echo cp "$fname" "$newfname"
    cp "$fname" "$newfname"
    # Prevent client scripts loading, so only static content on old release note paths.
    sed -i 's/<script type="module" async src=/<!--/g' "$newfname"
    sed -i 's/<\/body>/--><\/body>/g' "$newfname"
  fi
done
