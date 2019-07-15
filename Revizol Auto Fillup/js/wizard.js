var Wizard = function() {
    var n = document,
        r = n.createElement("div"),
        t = n.createElement("select"),
        f = n.createElement("b"),
        i = [{
            k: "",
            n: chrome.i18n.getMessage("optionsProfilesMenuUnfiled")
        }],
        u = oLS.catnow > 2 ? oLS.catnow - 4 : 0,
        e = chrome.i18n.getMessage("buttonsGenerateRules"),
        o = chrome.i18n.getMessage("buttonsGenerateRulesTT"),
        s = chrome.runtime.connect({
            name: "wizard"
        });
    return {
        addCat: function() {
            var n = (prompt(chrome.i18n.getMessage("promptProfileName") + ":") || "").trim(),
                i;
            if (n)
                if (n.length > 60) alert("[" + sExtName + "] " + chrome.i18n.getMessage("statusProfileCharLimit")), t.selectedIndex = u;
                else if (/^(all|unfiled|manage\.\.\.|new\.\.\.)$/i.test(n) || n.indexOf(sBackup) === 0 || n.indexOf("——") === 0) alert("[" + sExtName + "] " + chrome.i18n.getMessage("statusProfileReserved")), t.selectedIndex = u;
            else {
                for (i = 1; i < t.length; ++i)
                    if (t[i].text === n) {
                        alert("[" + sExtName + "] " + chrome.i18n.getMessage("statusProfileDuplicate"));
                        t.selectedIndex = i;
                        return
                    }
                try {
                    chrome.runtime.sendMessage({
                        type: "saveCat",
                        data: {
                            cat: {
                                n: n
                            }
                        }
                    }, function() {})
                } catch (r) {
                    alert(sBgUpdErr)
                }
            } else {
                t.selectedIndex = u;
                return
            }
        },
        close: function() {
            r.style.webkitTransform = "translateY(-150%)";
            try {
                chrome.runtime.sendMessage({
                    type: "clearHighlight"
                })
            } catch (i) {
                alert(sBgUpdErr);
                return
            }
            n.removeEventListener("keydown", Wizard.handleKeyDown);
            s.disconnect();
            setTimeout(function() {
                var i = n.getElementsByTagName("style")[0];
                r.parentNode.removeChild(r);
                i && i.textContent.indexOf("#autofill") > -1 && i.parentNode.removeChild(i);
                delete oTable;
                delete oTR;
                delete oTD1;
                delete oTD2;
                delete oIcon;
                delete oStep1;
                delete oStep2;
                delete oStep3;
                delete t;
                delete oCreate;
                delete oClose;
                Wizard = undefined
            }, 400)
        },
        create: function() {
            try {
                chrome.runtime.sendMessage({
                    type: "gatherRules",
                    data: t.value
                })
            } catch (n) {
                alert(sBgUpdErr)
            }
        },
        popCats: function() {
            i.length = 1;
            i = i.concat(oLS.cats);
            i.push({
                k: "new",
                n: chrome.i18n.getMessage("optionsProfilesMenuNew")
            });
            t.length = 0;
            for (var r = 0, f; r < i.length; ++r) f = n.createElement("option"), f.value = i[r].k, f.text = i[r].n, i[r].n.indexOf(sBackup) === 0 ? f.hidden = !0 : r === u ? f.selected = !0 : r === i.length - 1 && (f.className = "menu-action"), t.add(f)
        },
        selCat: function() {
            this.value === "new" ? Wizard.addCat() : u = this.selectedIndex
        },
        setStatus: function(n, t) {
            f.className = n ? "warning" : "success";
            f.textContent = t
        },
        show: function() {
            var i = "autofill-wizard",
                w = n.createElement("table"),
                v = n.createElement("tr"),
                b = n.createElement("td"),
                u = n.createElement("td"),
                y = n.createElement("img"),
                p = n.createElement("span"),
                l = n.createElement("span"),
                a = n.createElement("span"),
                h = n.createElement("button"),
                c = n.createElement("a");
            r.id = i;
            r.onselectstart = function() {
                return !1
            };
            y.src = chrome.runtime.getURL("images/icon24.png");
            y.title = chrome.i18n.getMessage("wizardTitle");
            p.id = i + "-step1";
            p.innerHTML = "<b>&#10122;</b> " + chrome.i18n.getMessage(oLS.editable ? "wizardFillField" : "wizardFillForm");
            l.id = i + "-step2";
            l.innerHTML = "<b>&#10123;</b> " + chrome.i18n.getMessage("wizardChooseProfile") + ": ";
            a.id = i + "-step3";
            a.innerHTML = "<b>&#10124;</b> ";
            Wizard.popCats();
            t.onchange = Wizard.selCat;
            t.setAttribute("accesskey", "p");
            l.appendChild(t);
            h.id = i + "-create";
            h.innerHTML = oLS.editable ? e.replace("Rules", "Rule") : e;
            h.title = oLS.editable ? o.replace("rules", "rule") : o;
            h.onclick = Wizard.create;
            h.setAttribute("accesskey", "g");
            a.appendChild(h);
            f.id = i + "-status";
            c.href = "javascript:;";
            c.title = chrome.i18n.getMessage("buttonsClose");
            c.onclick = Wizard.close;
            c.textContent = " ";
            b.appendChild(y);
            u.appendChild(p);
            u.appendChild(l);
            u.appendChild(a);
            u.appendChild(f);
            u.appendChild(c);
            v.appendChild(b);
            v.appendChild(u);
            w.appendChild(v);
            r.appendChild(w);
            n.body.appendChild(r);
            setTimeout(function() {
                r.style.webkitTransform = "inherit"
            }, 50);
            n.addEventListener("keydown", Wizard.handleKeyDown);
            s.onMessage.addListener(Wizard.handleMessage)
        },
        updateCats: function() {
            u = Math.max(oLS.catnow - 4, 0);
            Wizard.popCats()
        },
        updateText: function(t) {
            var i = n.getElementById("autofill-wizard-create");
            n.getElementById("autofill-wizard-step1").innerHTML = "<b>&#10122;</b> " + chrome.i18n.getMessage("wizardFill" + (t ? "Field" : "Form"));
            i.innerHTML = t ? e.replace("Rules", "Rule") : e;
            i.title = t ? o.replace("rules", "rule") : o;
            Wizard.setStatus(1, "")
        },
        handleKeyDown: function(n) {
            n.key === "Escape" && Wizard.close()
        },
        handleMessage: function(t) {
            var r, u, e, f, i;
            switch (t.type) {
                case "gotRules":
                    r = t.data;
                    u = ["elric", "jeannie", "merlin", "sabrina", "samantha", "simon"];
                    r.length ? (e = /([$^.?+*\\|(){}\[\]])/g, f = n.querySelector("#autofill-wizard-step3>button"), f.disabled = !0, f.style.color = "#999", chrome.runtime.sendMessage({
                        type: "saveRules",
                        data: {
                            rules: r
                        }
                    }), Wizard.setStatus(0, chrome.i18n.getMessage("statusDone")), oLS.other.voice && (i = new Audio(chrome.runtime.getURL("sounds/" + u[oLS.voice < 6 ? oLS.voice : R(0, 5)] + ".ogg")), i.play(), delete i), setTimeout(Wizard.close, 2e3)) : (Wizard.setStatus(1, t.field ? chrome.i18n.getMessage("statusEnterValue") : chrome.i18n.getMessage("statusNoChange")), oLS.other.voice && (i = new Audio(chrome.runtime.getURL("sounds/" + u[oLS.voice < 6 ? oLS.voice : R(0, 5)] + "-err.ogg")), i.play(), delete i))
            }
        }
    }
}();
Wizard.show();