// Generated by CoffeeScript 1.3.3
(function() {

  define(function(require, exports, module) {
    var EDGE, ImagePreview, node;
    node = require('lib/utils').node;
    require('vendor/link!css/imagepreview.css');
    EDGE = 140;
    ImagePreview = Backbone.View.extend({
      className: 'overlay',
      events: {
        'click': 'dismissOnOverlay'
      },
      initialize: function(url) {
        var _this = this;
        _.bindAll(this, 'onKeyDown');
        ImagePreview.getPreviewElement(url, window.innerWidth - EDGE, window.innerHeight - EDGE, function(err, element) {
          if (err) {
            return _this.dismiss();
          } else {
            return _this.el.appendChild(element);
          }
        });
        document.addEventListener('keydown', this.onKeyDown, true);
        $(document.body).append(this.el);
        return _.delay(function() {
          return _this.$el.addClass('is-loaded');
        }, 30);
      },
      dismissOnOverlay: function(e) {
        return this.dismiss();
      },
      dismiss: function() {
        var _this = this;
        document.removeEventListener('keydown', this.onKeyDown, true);
        this.$el.removeClass('is-loaded');
        return _.delay((function() {
          return _this.$el.remove();
        }), 500);
      },
      onKeyDown: function(e) {
        switch (e.keyCode) {
          case 27:
            this.dismiss();
        }
        e.stopPropagation();
        return e.preventDefault();
      }
    });
    ImagePreview.getPreviewElement = function(url, maxWidth, maxHeight, cb) {
      var img;
      img = $(node('img', {
        src: url
      }));
      img.on('load', function() {
        var height, scale, width, _ref;
        _ref = img[0], width = _ref.naturalWidth, height = _ref.naturalHeight;
        if (!(width && height)) {
          return cb(true);
        }
        scale = Math.min(maxWidth / width, maxHeight / height);
        if (scale > 1) {
          scale = 1;
        }
        return cb(null, node('div', {
          "class": 'imagepreview'
        }, node('div', {
          "class": 'image',
          style: {
            width: Math.floor(width * scale),
            height: Math.floor(height * scale)
          }
        }, node('div', {
          "class": 'inner',
          style: {
            backgroundImage: "url(" + url + ")"
          }
        })), node('div', {
          "class": 'imginfo'
        }, node('div', {
          "class": 'name'
        }, (url.split('/').slice(-1)[0])), node('div', {
          "class": 'size'
        }, "" + width + " x " + height))));
      });
      return img.on('error', function() {
        console.log('error');
        return cb(true);
      });
    };
    return module.exports = ImagePreview;
  });

}).call(this);
