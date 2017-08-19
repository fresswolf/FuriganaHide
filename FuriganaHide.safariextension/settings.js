var Settings = (function() {
    function Settings() {
        this.init();
    }

    Settings.prototype.init = function() {

    }

    Settings.prototype.enableForDomain = function(enable, domain) {
        if (domain == undefined) {
            return;
        }
        localStorage.setItem(domain, enable ? "true" : "false");
    }

    Settings.prototype.isEnabledForDomain = function(domain) {
        if (domain == undefined) {
            return false;
        }
        return JSON.parse(localStorage.getItem(domain));
    }

    return Settings;
})();
