var FuriganaHide = (function() {
    function FuriganaHide() {
        this.init();
    }

    FuriganaHide.prototype.init = function() {
        safari.self.addEventListener("message", this.messageHandler.bind(this), false);
        safari.self.tab.dispatchMessage("furiganaHideEnabled", window.location.hostname);
    }

    FuriganaHide.prototype.messageHandler = function(messageEvent) {
        if (messageEvent.name == "furiganaHideEnabledAnswer") {

            if (messageEvent.message === true) {
                document.body.classList.add('furiganaHide');
            } else {
                document.body.classList.remove('furiganaHide');
            }
        }
    }

    return FuriganaHide;
})();

var furiganaHide = new FuriganaHide();
