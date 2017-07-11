(function () {
  const $ = (selector, root = document) => {
    return root.querySelector(selector);
  };
  $.on = (el, eventName, handler) => {
    el.addEventListener(eventName, handler, false);
  };
  $.hide = el => {
    el.style.display = 'none';
  };
  $.show = el => {
    el.style.display = 'block';
  };
  const ajax = {
    post(url, data) {
      return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = function (e) {
          if (xhr.readyState === XMLHttpRequest.DONE) {
            let res = { status: xhr.status, data: JSON.parse(xhr.responseText) };
            if (xhr.status >= 400) {
              reject(res)
            } else {
              resolve(res);
            }
          }
        };
        xhr.send(JSON.stringify(data));
      });
    }
  };
  document.addEventListener('DOMContentLoaded', function () {
    let errorDiv = $('#error-div');
    let resultDiv = $('#result-div');
    let btnShort = $('#btn-short');
    let btnCopy = $('#btn-copy');
    let btnGo = $('#btn-go');
    let urlInput = $('#url-input');
    let resultInput = $('#result-input');

    // 处理缩短网址
    $.on(btnShort, 'click', function () {
      let val = urlInput.value;
      if (!val) {
        $.show(errorDiv);
        return;
      }
      $.hide(errorDiv);
      ajax.post('/api/v1', { longUrl: val })
        .then(res => {
          resultInput.value = `${location.origin}/${res.data.shortId}`;
          $.show(resultDiv);
        })
        .catch(res => {
          alert(res.data.error);
        });
    });

    // 处理复制按钮
    $.on(btnCopy, 'click', function () {
      resultInput.select();
      try {
        document.execCommand('copy');
      } catch (e) { console.error(e); }
    });

    // 处理跳转
    $.on(btnGo, 'click', function () {
      let a = document.createElement('a');
      a.setAttribute('href', resultInput.value);
      a.setAttribute('target', '_blank');
      // IE9需要将a标签加入到body中，此处不考虑
      a.click();
    });

  }, false);
})();
