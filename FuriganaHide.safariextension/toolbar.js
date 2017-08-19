var Toolbar = (function() {
    function Toolbar() {
        this.init();
    }

    Toolbar.prototype.init = function() {
        var itemArray = safari.extension.toolbarItems;
        for (var i = 0; i < itemArray.length; ++i) {
            var item = itemArray[i];
            if (item.identifier == "FuriganaHideToolbar") {
                for (var i = 0; i < item.menu.menuItems.length; ++i) {
                    var menuItem = item.menu.menuItems[i];
                    if (menuItem.identifier == "enableForDomain") {
                        this.enableForDomainButtonTitle = menuItem.title;
                        this.enableForDomainButton = menuItem;
                    }
                }
            }
        }
    }

    Toolbar.prototype.refresh = function(enabledForDomain, domain) {
        this.enableForDomainButton.checkedState = false;

        if (domain) {
            this.enableForDomainButton.disabled = false;
            if (enabledForDomain) {
                this.enableForDomainButton.title = "Disable for " + domain;
            } else {
                this.enableForDomainButton.title = "Enable for " + domain;
            }
        } else {
            this.enableForDomainButton.disabled = true;
            this.enableForDomainButton.title = this.enableForDomainButtonTitle;
        }
    }

    return Toolbar;
})();
