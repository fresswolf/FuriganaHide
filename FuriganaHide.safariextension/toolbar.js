var Toolbar = (function() {
    function Toolbar() {
        this.init();
    }

    Toolbar.prototype.init = function() {
        var itemArray = safari.extension.toolbarItems;
        for (var i = 0; i < itemArray.length; ++i) {
            var item = itemArray[i];
            if (item.identifier == "hideFuriganaToolbar") {
                for (var i = 0; i < item.menu.menuItems.length; ++i) {
                    var menuItem = item.menu.menuItems[i];
                    if (menuItem.identifier == "disableGlobally") {
                        this.disableGloballyButton = menuItem;
                    }
                    if (menuItem.identifier == "disableForDomain") {
                        this.disableForDomainButtonTitle = menuItem.title;
                        this.disableForDomainButton = menuItem;
                    }
                }
            }
        }
    }

    Toolbar.prototype.refresh = function(disableGlobally, disableForDomain, domain) {
        if (disableGlobally == undefined) {
            disableGlobally = false;
        }
        if (disableForDomain == undefined) {
            disableForDomain = false;
        }
        this.disableGloballyButton.checkedState = disableGlobally;
        this.disableForDomainButton.checkedState = disableForDomain;

        if (domain) {
            this.disableForDomainButton.disabled = false;
            this.disableForDomainButton.title = this.disableForDomainButtonTitle + " (" + domain + ")";
        } else {
            this.disableForDomainButton.disabled = true;
            this.disableForDomainButton.title = this.disableForDomainButtonTitle;
        }
    }

    return Toolbar;
})();
