zk.afterLoad('zul.menu', function () {
	var _menupopup = {},
		_menupopupMolds = {};

zk.override(zul.menu.Menupopup.molds, _menupopupMolds, {
	'bs': zul.menu.Menupopup.molds['default']
});

zk.override(zul.menu.Menupopup.prototype, _menupopup, {
	_inBSMold: function () {
		return true;
	},
	getZclass: function () {
		if (this._inBSMold()) {
			return this._zclass ? this._zclass : '';
		} else
			return _menupopup.getZclass.apply(this, arguments);
	},
	$s: function (subclass) {
		if (this._inBSMold()) {
			switch (subclass) {
			case 'separator':
				return '';
			case 'content':
				return 'dropdown-menu';
			}
			return '';
		} else
			return _menupopup.$s.apply(this, arguments);
	},
	open: function () {
		if (this._inBSMold()) {
			this.forcerender();
			jq(this.$n('cave')).css({position: 'relative', display: 'block'});
			_menupopup.open.apply(this, arguments);
		} else
			return _menupopup.open.apply(this, arguments);
	}
/*
	 _posInfo: function (ref, offset, position, opts) {
            var r=this.$super('_posInfo',ref, offset, position, opts);

            if (r.dim && jq.isArray(offset) && typeof offset[0]=='string') {
                r.dim.left=offset[0];
            }

            return r;
     }
*/
});

var _menuseparator = {};

zk.override(zul.menu.Menuseparator.prototype, _menuseparator, {
	_inBSMold: function () {
		return true;
	},
	getZclass: function () {
		if (this._inBSMold())
			return this._zclass != null ? this._zclass : 'divider';
		return _menuseparator.getZclass.apply(this, arguments);
	}
});

var _menuitem= {};

zk.override(zul.menu.Menuitem.prototype, _menuitem, {
	_inBSMold: function () {
		return true;
	},
	getZclass: function () {
		if (this._inBSMold())
			return this._zclass != null ? this._zclass : '';
		return _menuitem.getZclass.apply(this, arguments);
	},
	$s: function (subclass) {
		if (this._inBSMold()) {
			switch (subclass) {
			case 'disabled':
				return 'disabled';
			}
			return '';
		} else
			return _menupopup.$s.apply(this, arguments);
	},
    domContent_: function () {
		var label = '<span class="' + this.$s('text') + '">' +
				(zUtl.encodeXML(this.getLabel())) + '</span>',
			icon = '<i class="' + this.$s('icon') + (this.isChecked() ? ' z-icon-check-square-o' : ' z-icon-square-o') + '"></i>',
			img = this.getImage(),
			iconSclass = this.domIcon_();

		if (img)
			img = '<img src="' + img + '" class="' + this.$s('image') + '" align="absmiddle" />'
				+ (iconSclass ? ' ' + iconSclass : '');
		else {
			if (iconSclass) {
				img = iconSclass;
			} else {
				img = '<img ' + (this.isTopmost() ? 'style="display:none"' : '') +
					' src="data:image/png;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" class="' +
					this.$s('image') + '" align="absmiddle" />';
			}
		}
		return img + (this.isAutocheck() || this.isCheckmark() ? icon : '') + ' ' + label;
	}

});

});