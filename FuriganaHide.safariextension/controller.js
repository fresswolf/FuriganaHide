var Controller = (function() {
    function Controller() {
        this.init();
    }

    Controller.prototype.init = function() {
        this.toolbar = new Toolbar();
        this.settings = new Settings();
        safari.application.addEventListener("activate", this.onPageChange.bind(this), true);
        safari.application.addEventListener("navigate", this.onPageChange.bind(this), true);
        safari.application.addEventListener("command", this.onToolbarButtonClick.bind(this), false);
        safari.application.addEventListener("message", this.messageHandler.bind(this), false);
    }

    Controller.prototype.messageHandler = function(messageEvent) {
        if (messageEvent.name == "furiganaHideEnabled") {
            var domain = messageEvent.message;
            var enabled = this.settings.isEnabledGlobally() && this.settings.isEnabledForDomain(domain);

            if (messageEvent.target.page) {
                messageEvent.target.page.dispatchMessage("furiganaHideEnabledAnswer", enabled);
            }
        }
    }

    Controller.prototype.onToolbarButtonClick = function(event) {
        var domain = this.getCurrentDomain();
        if (event.command == "disableGlobally") {
            this.settings.enableGlobally(!this.settings.isEnabledGlobally());
        } else if (event.command == "disableForDomain") {
            this.settings.enableForDomain(!this.settings.isEnabledForDomain(domain), domain);
        }
        this.onPageChange();

        var enabled = this.settings.isEnabledGlobally() && this.settings.isEnabledForDomain(domain);
        safari.application.activeBrowserWindow.activeTab.page.dispatchMessage("furiganaHideEnabledAnswer", enabled);
    }

    Controller.prototype.getCurrentDomain = function() {
        var url = safari.application.activeBrowserWindow.activeTab.url;
        if (url == undefined || url.length < 1) {
            return undefined;
        } else {
            return new URL(url).hostname;
        }
    }

    Controller.prototype.onPageChange = function() {
        var domain = this.getCurrentDomain();

        var disabledGlobally = !this.settings.isEnabledGlobally();
        var disabledForDomain = !this.settings.isEnabledForDomain(domain);
        this.toolbar.refresh(disabledGlobally, disabledForDomain, domain);
    }

    return Controller;
})();

var controller = new Controller();
