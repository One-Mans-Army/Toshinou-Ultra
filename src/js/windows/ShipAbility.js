class ShipAbility {
    createWindow() {
        this.shipAbilityWindow = WindowFactory.createWindow({
            width: 320,
            text: "Ship Ability"
        });

        let options = [
            {
                name: 'useAbility',
                labelText: chrome.i18n.getMessage('useability'),
                appendTo: this.shipAbilityWindow,
                event: function () {
                    $(".ability").prop("disabled", !this.checked);
                    window.settings.settings.useAbility = this.checked;
                }
            },
            {
                name: 'abilitySlot',
                labelText: chrome.i18n.getMessage('abilityslot'),
                type: "select",
                disabled: true && !window.settings.settings.useAbility,
                appendTo: this.shipAbilityWindow,
                options: {"0":0, "1":1, "2":2, "3":3, "4":4, "5":5, "6":6, "7":7, "8":8, "9":9},
                attrs:{
                    class: "ability"
                },
                event: function () {
                    window.settings.settings.abilitySlot = this.value;
                }
            },
            {
                name: 'useAbilityWhenHpOrShdIsLowerThanPercent',
                labelText: chrome.i18n.getMessage("useabilitywhenhporshd"),
                type: 'range',
                appendTo: this.shipAbilityWindow,
                labelBefore: true,
                attrs: {
                    min: 0,
                    max: 100,
                    step: 1,
                    value: 75
                },
                event: function (ev) {
                    window.settings.settings.useAbilityWhenHpOrShdIsLowerThanPercent = this.value;
                    $('span:first-child', this.label).text(' (' + this.value + '%)');
                }
            },
        ];

        options.forEach((options) => {
            if(options.type == "select"){
                this[options.name] = ControlFactory.select(options);
            }else{
                this[options.name] = ControlFactory.createControl(options);
            }

        });
    }
}