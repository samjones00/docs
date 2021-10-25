// Google Analytics
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-7722718-13', 'auto');
ga('send', 'pageview');

function copy(e) {
    let $el = document.createElement("input");
    let $parent = e.parentElement.parentElement;
    let $lbl = $parent.firstElementChild;
    $el.setAttribute("value", $lbl.innerText);
    document.body.appendChild($el);
    $el.select();
    document.execCommand("copy");
    document.body.removeChild($el);
    let $copyText = $parent.parentElement.querySelector('.copy-text');
    $copyText.innerHTML = '<label>copied!</label>';
    setTimeout(function () {
        $copyText.innerHTML = '';
    }, 5000);
}
