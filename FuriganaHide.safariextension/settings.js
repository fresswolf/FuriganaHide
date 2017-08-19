var Settings = (function() {
    function Settings() {
        this.init();
    }

    Settings.prototype.init = function() {

    }

    Settings.prototype.enableGlobally = function(enable) {
        localStorage.setItem("disabledGlobally", enable ? 0 : 1);
    }

    Settings.prototype.enableForDomain = function(enable, domain) {
        if (domain == undefined) {
            return;
        }
        localStorage.setItem(domain, enable ? 0 : 1);
    }

    Settings.prototype.isEnabledGlobally = function() {
        return !JSON.parse(localStorage.getItem("disabledGlobally"));
    }

    Settings.prototype.isEnabledForDomain = function(domain) {
        if (domain == undefined) {
            return true;
        }
        return !JSON.parse(localStorage.getItem(domain));
    }

    return Settings;
})();
