function activateTab(n) {
    var t = "fields",
        i = "advanced",
        r = "exceptions",
        u = "textclips",
        f = "variables";
    if (n && n.target && (n = this.id.slice(4)), location.hash = n, D.body.id = n, n === t || n === i || n === r || n === u || n === f) switch (n) {
        case i:
            setTimeout(function() {
                oTAA.focus()
            }, 50);
            oBS.onclick = function() {
                bFSS || saveOptions(t);
                bASS || saveOptions(i)
            };
            oBR.onclick = function() {
                bFRS || loadOptions(t);
                bARS || loadOptions(i)
            };
            break;
        case r:
            setTimeout(function() {
                oTAE.focus()
            }, 50);
            oBS.onclick = function() {
                bFSS || saveOptions(t);
                bESS || saveOptions(r)
            };
            oBR.onclick = function() {
                bFRS || loadOptions(t);
                bERS || loadOptions(r)
            };
            break;
        case u:
            setTimeout(function() {
                oTAT.focus()
            }, 50);
            oBS.onclick = function() {
                bFSS || saveOptions(t);
                bTSS || saveOptions(u)
            };
            oBR.onclick = function() {
                bFRS || loadOptions(t);
                bTRS || loadOptions(u)
            };
            break;
        case f:
            setTimeout(function() {
                oTAV.focus()
            }, 50);
            oBS.onclick = function() {
                bFSS || saveOptions(t);
                bVSS || saveOptions(f)
            };
            oBR.onclick = function() {
                bFRS || loadOptions(t);
                bVRS || loadOptions(f)
            }
    } else n === "importexport" && setTimeout(function() {
        oIE.focus()
    }, 50);
    setAccessKeys(n)
}

function cleanText(n) {
    return n = n.replace(/[\r\n]{2,}/g, "\n"), n.replace(/^\s+|\s+$/gm, "")
}

function disableButtons(n, t, i) {
    if (n !== "fields" && n || (oBS.disabled = t, oBR.disabled = i, bFSS = t, bFRS = i), n === "advanced" || n === "exceptions" || n === "textclips" || n === "variables" || !n) {
        bFSS || bFRS ? ((t && bFSS || !t && bFRS) && (oBS.disabled = t), (i && bFRS || !i) && (oBR.disabled = i)) : (oBS.disabled = t, oBR.disabled = i);
        switch (n) {
            case "advanced":
                bASS = t;
                bARS = i;
                break;
            case "exceptions":
                bESS = t;
                bERS = i;
                break;
            case "textclips":
                bTSS = t;
                bTRS = i;
                break;
            case "variables":
                bVSS = t;
                bVRS = i
        }
    }
    oBA.disabled = err("fields") && t || !1
}

function doResize() {
    W = D.body.offsetWidth;
    H = D.documentElement.clientHeight;
    resizeTable();
    oB.style.maxHeight = H - 60 + "px"
}

function escapeQuotes(n) {
    return n.replace(/"/g, "&quot;")
}

function loadOptions(n) {
    var t = typeof n != "string";
    chrome.storage.local.get(function(i) {
        var r, u;
        if (chrome.runtime.lastError) {
            console.error("[" + sExtName + "] There was a problem loading the data.");
            return
        }
        if (t && (oO = i.other, W = D.body.offsetWidth, H = D.documentElement.clientHeight, oNF = D.getElementById("nav-fields"), oNA = D.getElementById("nav-advanced"), oNE = D.getElementById("nav-exceptions"), oNT = D.getElementById("nav-textclips"), oNV = D.getElementById("nav-variables"), oNIE = D.getElementById("nav-importexport"), oNO = D.getElementById("nav-other"), oNS = D.getElementById("nav-support"), oND = D.getElementById("nav-datasize"), oNW = D.getElementById("nav-whatsnew"), oHN = D.getElementById("help-name"), oHV = D.getElementById("help-value"), oHS = D.getElementById("help-site"), oHM = D.getElementById("help-mode"), oBA = D.getElementById("button-add"), oBS = D.getElementById("button-save"), oBR = D.getElementById("button-reset"), oBH = D.getElementById("button-help"), oBI = D.getElementById("button-import"), oBE = D.getElementById("button-export"), oBIU = D.getElementById("button-importurl"), oT = D.getElementById("content-fields"), oTB = D.getElementById("content-fields-body"), oC = D.getElementById("content-cats"), oCS = D.getElementById("content-site"), oCH = D.getElementById("content-hotkey"), oTAA = D.getElementById("content-advanced"), oTAE = D.getElementById("content-exceptions"), oTAT = D.getElementById("content-textclips"), oTAV = D.getElementById("content-variables"), oIE = D.getElementById("content-ie"), oIR = D.getElementById("radio-replace"), oIA = D.getElementById("radio-append"), oIU = D.getElementById("content-importurl"), oOO = {
                backup: D.getElementById("content-backup"),
                manual: D.getElementById("content-manual"),
                delay: D.getElementById("content-delay"),
                labelmatch: D.getElementById("content-labelmatch"),
                overwrite: D.getElementById("content-overwrite"),
                vars: D.getElementById("content-vars"),
                sound: D.getElementById("content-sound"),
                voice: D.getElementById("content-voice"),
                debug: D.getElementById("content-debug"),
                mask: D.getElementById("content-mask"),
                scale: D.getElementById("content-scale"),
                menu: D.getElementById("content-menu"),
                autoimport: D.getElementById("content-autoimport")
            }, oBU = D.getElementById("content-backup-chars"), oD = D.getElementById("content-delay-sec"), oDO = D.getElementById("content-delay-out"), oV = D.getElementById("content-voice-sel"), oS = D.getElementById("status"), oST = oS.getElementsByTagName("span")[0], oL = D.getElementById("light"), oB = D.getElementById("box"), oTT = D.getElementById("tt"), oErr.isOn = function() {
                return oST.textContent.length > 0 && oST.style.background === sErrBg
            }, oErr.refresh = function() {
                for (var n = 1, t; n < oT.rows.length; ++n) t = oT.rows[n].id.slice(2), oErr.fields[n] = D.getElementById("n_" + t).style.background || D.getElementById("v_" + t).style.background || D.getElementById("s_" + t).style.background ? 1 : "";
                err("fields") || showStatus()
            }, n = location.hash.slice(1), D.getElementById("tab-" + n) && activateTab(n), sVer > (i.ver || "1.0.0") && (showWhatsNew(), storageSet({
                ver: sVer
            })), resizeTable(), D.body.style.visibility = "visible"), oErr.isOn() && showStatus(), (n === "fields" || t) && (oErr.fields = [], aC = i.cats, nC = i.catcount, nCI = nCI2 = i.catnow, oR = JSON.parse(i.rules), nR = i.rulecount, popCats(), buildRules(oC.value)), (n === "cats" || t) && (r = nCI < 3, oCS.disabled = r, oCH.disabled = r, r ? oCS.value = oCH.value = "" : (oCS.value = aC[nCI - 5].s || "", oCH.value = aC[nCI - 5].h || "", oCH.hotkey = oCH.value, (isBackupCat = oC[oC.selectedIndex].text.indexOf(sBackup) === 0) && (oCS.disabled = oCH.disabled = !0))), (n === "advanced" || t) && (aA = i.advanced, oTAA.value = aA.join("\n")), (n === "exceptions" || t) && (aE = i.exceptions, oTAE.value = aE.join("\n")), (n === "textclips" || t) && (aT = i.textclips, oTAT.value = aT.join("\n===\n")), (n === "variables" || t) && (aV = i.variables, oTAV.value = aV.join("\n")), disableButtons(n, !0, !0), t) {
            updateDataSize();
            oNW.textContent = "v" + sVer;
           
            oNW.title = chrome.i18n.getMessage("generalWhatsNewTT") + " (" + sK + "+?)";
            oBA.title = chrome.i18n.getMessage("buttonsAddTT") + " (" + sK + "+A)";
            oC.title = chrome.i18n.getMessage("selectProfileTT") + " (" + sK + "+P)";
            oC.options[3].text = chrome.i18n.getMessage("optionsProfilesMenuManage") + "             " + sK + "+G";
            for (u in oOO) oOO[u].checked = oO[u], oOO[u].addEventListener("click", saveOptions);
            oBU.disabled = !oOO.backup.checked;
            oBU.value = i.backup;
            oD.disabled = !oOO.delay.checked;
            oD.value = i.delay;
            oDO.textContent = oD.value;
            oV.disabled = !oOO.voice.checked;
            oV.selectedIndex = i.voice;
            oIU.value = i.autoimport;
            oB.addEventListener("keydown", watchBox);
            oNF.addEventListener("click", activateTab);
            oNA.addEventListener("click", activateTab);
            oNE.addEventListener("click", activateTab);
            oNT.addEventListener("click", activateTab);
            oNV.addEventListener("click", activateTab);
            oNIE.addEventListener("click", activateTab);
            oNO.addEventListener("click", activateTab);
            oNS.addEventListener("click", activateTab);
            oNW.addEventListener("click", showWhatsNew);
            oHN.addEventListener("mouseover", function() {
                tooltip.show(chrome.i18n.getMessage("optionsFieldsNameColTooltip"))
            });
            oHN.addEventListener("mouseout", function() {
                tooltip.hide()
            });
            oHV.addEventListener("mouseover", function() {
                tooltip.show(chrome.i18n.getMessage("optionsFieldsValueColTooltip"))
            });
            oHV.addEventListener("mouseout", function() {
                tooltip.hide()
            });
            oHS.addEventListener("mouseover", function() {
                tooltip.show(chrome.i18n.getMessage("optionsFieldsSiteColTooltip"))
            });
            oHS.addEventListener("mouseout", function() {
                tooltip.hide()
            });
            oHM.addEventListener("mouseover", function() {
                tooltip.show(chrome.i18n.getMessage("optionsFieldsModeColTooltip"))
            });
            oHM.addEventListener("mouseout", function() {
                tooltip.hide()
            });
            oBA.addEventListener("click", function() {
                addRow(nR++, 0, "", "", "", oO.overwrite, oC[nCI].value)
            });
            oBS.addEventListener("click", function() {
                saveOptions("fields")
            });
            oBR.addEventListener("click", function() {
                loadOptions("fields")
            });
            oBH.addEventListener("click", openHelp);
            oBI.addEventListener("click", importCSV);
            oBE.addEventListener("click", exportCSV);
            oBIU.addEventListener("click", importURL);
            oC.addEventListener("change", changeCat);
            oCS.addEventListener("change", function() {
                saveOptions("cats")
            });
            oTAA.addEventListener("keyup", updateButtons);
            oTAE.addEventListener("keyup", updateButtons);
            oTAT.addEventListener("keyup", updateButtons);
            oTAV.addEventListener("keyup", updateButtons);
            oBU.addEventListener("input", function() {
                saveOptions("backup")
            });
            oD.addEventListener("input", function() {
                saveOptions("delay")
            });
            oV.addEventListener("change", function() {
                saveOptions("voice")
            });
            oIU.addEventListener("change", function() {
                saveOptions("autoimport")
            });
            oL.addEventListener("click", showBox);
            oB.addEventListener("click", function(n) {
                n.stopPropagation()
            });
            oCH.addEventListener("blur", resetHotkey);
            oCH.addEventListener("keyup", handleHotkeyUp);
            oCH.addEventListener("keydown", handleHotkeyDown);
            oTB.addEventListener("change", delegateChange, !0);
            oTB.addEventListener("click", delegateClick, !0);
            oTB.addEventListener("focus", delegateFocus, !0);
            oTB.addEventListener("keydown", delegateKeyDown, !0);
            oTB.addEventListener("keyup", delegateKeyUp, !0);
            oTB.addEventListener("mouseover", delegateMouseOver);
            window.addEventListener("resize", doResize)
        }
    })
}

function openHelp() {
    open("http://www.tohodo.com/autofill/help.html#" + D.body.id, "AutofillHelp")
}

function saveOptions(n) {
    var f, t;
    if (n.target)
        if (this.id && this.id.indexOf("content-") === 0) n = this.id.slice(8);
        else return;
    switch (n) {
        case "fields":
            var r = oC[nCI] && oC[nCI].value || oC.value,
                u = 0,
                i = [].slice.call(oTB.querySelectorAll("tr[id]"));
            for (t = 0; t < i.length; ++t) validRow(i[t].id.slice(2)) || ++u;
            if (u > 0) return;
            disableButtons(n, !0, !0);
            for (t in oR)(r === "all" || r === oR[t].c) && delete oR[t];
            for (t = 0; t < i.length; ++t) setRule(i[t]);
            popCats();
            storageSet({
                rulecount: nR,
                rules: JSON.stringify(oR)
            });
            chrome.storage.local.get("cats", function(n) {
                chrome.runtime.lastError || aC.length === n.cats.length && JSON.stringify(aC) === JSON.stringify(n.cats) || saveOptions("cats")
            });
            break;
        case "cats":
            aC.length ? nCI > 4 && (aC[nCI - 5].s = oCS.value = validRegex(oCS.value) ? oCS.value.trim() : "") : nCI = nCI2 = Math.min(nCI, 2);
            storageSet({
                catcount: nC,
                catnow: nCI2,
                cats: aC
            });
            BG.buildMenu(aC, nCI2);
            break;
        case "advanced":
            if (err("fields")) return;
            for (disableButtons(n, !0, !0), oTAA.value = cleanText(oTAA.value), aA = oTAA.value ? oTAA.value.split("\n") : [], t = 0; t < aA.length; ++t) aA[t] = aA[t].replace(/ *: */, ": ").replace(/ *= */g, "=").replace(/ {2,}/g, " "), /^[cr]\d+:/.test(aA[t]) || aA.splice(t, 1);
            oTAA.value = aA.join("\n");
            storageSet({
                advanced: aA
            });
            break;
        case "exceptions":
            if (err("fields")) return;
            for (disableButtons(n, !0, !0), oTAE.value = cleanText(oTAE.value), aE = oTAE.value ? oTAE.value.split("\n") : [], t = 0; t < aE.length; ++t) validRegex(aE[t]) || (aE.splice(t, 1), --t);
            oTAE.value = aE.join("\n");
            storageSet({
                exceptions: aE
            });
            break;
        case "textclips":
            if (err("fields")) return;
            for (disableButtons(n, !0, !0), oTAT.value = oTAT.value.replace(/\r\n/g, "\n").replace(/^(===)$/gm, "\n$1\n"), aT = oTAT.value ? oTAT.value.split("\n===\n").filter(String) : [], t = 0; t < aT.length; ++t) aT[t] = t === 0 ? aT[t].replace(/\n$/, "") : t === aT.length - 1 ? aT[t].replace(/^\n/, "") : aT[t].replace(/^\n|\n$/g, ""), f = aT[t].split(/\n+/).filter(String), f.length < 2 && (aT.splice(t, 1), --t);
            oTAT.value = aT.join("\n===\n");
            storageSet({
                textclips: aT
            }).then(function() {
                BG.buildMenu(aC, nCI2)
            });
            break;
        case "variables":
            if (err("fields")) return;
            for (disableButtons(n, !0, !0), oTAV.value = cleanText(oTAV.value), aV = oTAV.value ? oTAV.value.split("\n") : [], t = 0; t < aV.length; ++t) aV[t] = aV[t].replace(/ *= */, " = ").replace(/ {2,}/g, " "), /^\w+ = /.test(aV[t]) || aV.splice(t, 1);
            oTAV.value = aV.join("\n");
            storageSet({
                variables: aV
            });
            break;
        default:
            oO[n] = +(oOO[n] ? oOO[n].checked : D.getElementById("content-" + n).checked);
            switch (n) {
                case "autoimport":
                    oO[n] = +oOO[n].checked;
                    oIU.value = oIU.value.trim();
                    oIU.value && !/^(https?|file):\/\/[\w~!@#%&=+|;:,./?-]+[\w~@#%&=+|/-]/.test(oIU.value) && (showStatus(chrome.i18n.getMessage("statusInvalidUrl"), 1), setTimeout(showStatus, 4e3));
                    oErr.isOn() || storageSet({
                        autoimport: oIU.value
                    });
                    break;
                case "backup":
                    oBU.disabled = !oOO[n].checked;
                    oO[n] = +oOO[n].checked;
                    oBU.value = Math.max(Math.min(1e4, +oBU.value), 1);
                    storageSet({
                        backup: +oBU.value
                    });
                    break;
                case "delay":
                    window.event && window.event.type === "input" && (oDO.textContent = oD.value);
                    oD.disabled = !oOO[n].checked;
                    oO[n] = +oOO[n].checked;
                    storageSet({
                        delay: +oD.value
                    });
                    break;
                case "vars":
                    loadOptions("fields");
                    break;
                case "voice":
                    oV.disabled = !oOO[n].checked;
                    storageSet({
                        voice: oV.selectedIndex
                    });
                    break;
                case "mask":
                    (D.getElementById("n_" + nLR).value || D.getElementById("v_" + nLR).value) && saveOptions("fields");
                    buildRules(oC.value);
                    oErr.refresh();
                    break;
                case "scale":
                    oO[n] ? resizeTable() : (D.body.classList.remove("fluid-table"), oTB.removeAttribute("style"));
                    tableDnD = new TableDnD;
                    tableDnD.init(oT);
                    break;
                case "menu":
                    BG.buildMenu(aC, nCI2, !oO[n])
            }
            oErr.isOn() || storageSet({
                other: oO
            })
    }
    oErr.isOn() || showStatus(chrome.i18n.getMessage("statusOptionsSaved"), 0)
}

function setAccessKeys(n) {
    var u = n === "fields",
        f = n === "advanced",
        e = n === "exceptions",
        o = n === "textclips",
        s = n === "variables",
        r = n === "importexport",
        i = n === "other",
        t = "accesskey";
    oC.setAttribute(t, u ? "p" : "");
    oBA.setAttribute(t, u ? "a" : "");
    oBS.setAttribute(t, u || f || e || o || s ? "s" : "");
    oBR.setAttribute(t, u || f || e || o || s ? "r" : "");
    oBI.setAttribute(t, r ? "m" : "");
    oBE.setAttribute(t, r ? "x" : "");
    oIR.setAttribute(t, r ? "r" : "");
    oIA.setAttribute(t, r ? "a" : "");
    oBIU.setAttribute(t, r ? "p" : "");
    oOO.autoimport.setAttribute(t, r ? "b" : "");
    oOO.backup.setAttribute(t, i ? "a" : "");
    oOO.manual.setAttribute(t, i ? "m" : "");
    oOO.delay.setAttribute(t, i ? "y" : "");
    oOO.labelmatch.setAttribute(t, i ? "b" : "");
    oOO.overwrite.setAttribute(t, i ? "w" : "");
    oOO.vars.setAttribute(t, i ? "p" : "");
    oOO.sound.setAttribute(t, i ? "s" : "");
    oOO.voice.setAttribute(t, i ? "z" : "");
    oOO.debug.setAttribute(t, i ? "g" : "");
    oOO.mask.setAttribute(t, i ? "k" : "");
    oOO.scale.setAttribute(t, i ? "r" : "");
    oOO.menu.setAttribute(t, i ? "x" : "");
    arguments.callee.caller.name === "showBox" && (oNF.setAttribute(t, n ? "l" : ""), oNA.setAttribute(t, n ? "n" : ""), oNE.setAttribute(t, n ? "c" : ""), oNT.setAttribute(t, n ? "t" : ""), oNV.setAttribute(t, n ? "v" : ""), oNIE.setAttribute(t, n ? "i" : ""), oNO.setAttribute(t, n ? "o" : ""), oNS.setAttribute(t, n ? "u" : ""), oBH.setAttribute(t, n ? "h" : ""))
}

function setRule(n, t) {
    var r = n.id.slice(2),
        f = D.getElementById("n_" + r),
        e = f.value.trim().replace(/\s*[\r\n]+\s*/g, "\n"),
        o = D.getElementById("s_" + r),
        u = cleanText(o.value),
        i;
    if (!u)
        for (i = 0; i < aC.length; ++i)
            if (aC[i].k === n.cat) {
                u = aC[i].s;
                break
            }
    for (t === undefined && (t = n.cat), i = 0; i < aC.length; ++i)
        if (aC[i].k === t) {
            t && aC[i].s === u && (u = "");
            break
        }
    f.value = e;
    o.value = u;
    oR["r" + r] = {
        t: D.getElementById("t_" + r).selectedIndex,
        n: e,
        v: D.getElementById("v_" + r).value,
        s: u,
        o: D.getElementById("o_" + r).selectedIndex,
        c: t
    }
}

function showStatus(n, t, i) {
    if (!n) {
        clearTimeout(oS.t);
        oS.style.webkitTransform = "translateY(-150%)";
        oS.t = setTimeout(function() {
            oS.style.display = "none";
            oST.innerHTML = ""
        }, 400);
        return
    }
    clearTimeout(oS.t);
    oST.style.background = t === 1 ? sErrBg : "#c6efce";
    oST.innerHTML = n;
    oS.style.display = "block";
    setTimeout(function() {
        oS.style.webkitTransform = "inherit"
    }, t === 2 ? 0 : 50);
    switch (t) {
        case 0:
            oS.t = setTimeout(function() {
                oS.style.webkitTransform = "translateY(-150%)";
                setTimeout(function() {
                    err("fields") ? (oST.style.background = sErrBg, oST.innerHTML = oErr.msg, oS.style.webkitTransform = "inherit") : (oS.style.display = "none", oST.innerHTML = "")
                }, 400)
            }, 4e3);
            break;
        case 1:
            i && disableButtons(i, !0, !1)
    }
}

function sortByName(n, t) {
    var i = n.n.toLowerCase(),
        r = t.n.toLowerCase();
    return i < r ? -1 : i > r ? 1 : 0
}

function storageSet(n) {
    return new Promise(function(t, i) {
        chrome.storage.local.set(n, function() {
            var n = chrome.runtime.lastError;
            n ? (console.error("[" + sExtName + "] " + n.message), i(n.message)) : (updateDataSize(), t())
        })
    })
}

function updateButtons() {
    switch (D.body.id) {
        case "advanced":
            this.value !== aA.join("\n") ? disableButtons("advanced", !1, !1) : disableButtons("advanced", !0, !0);
            break;
        case "exceptions":
            this.value !== aE.join("\n") ? disableButtons("exceptions", !1, !1) : disableButtons("exceptions", !0, !0);
            break;
        case "textclips":
            this.value !== aT.join("\n===\n") ? disableButtons("textclips", !1, !1) : disableButtons("textclips", !0, !0);
            break;
        case "variables":
            this.value !== aV.join("\n") ? disableButtons("variables", !1, !1) : disableButtons("variables", !0, !0)
    }
}

function updateDataSize() {
    chrome.storage.local.getBytesInUse(function(n) {
        chrome.runtime.lastError || (oND.innerHTML = chrome.i18n.getMessage("generalData") + ": " + (n + "").replace(/(\d)(?=(\d{3})+$)/g, "$1,") + " &nbsp;|&nbsp; ")
    })
}

function validRegex(n) {
    try {
        return new RegExp(n.replace(/\n/g, "|")), !0
    } catch (t) {
        return !1
    }
}

function watchBox(n) {
    switch (n.key) {
        case "Tab":
            (!n.shiftKey && n.target.tabIndex === 99 || n.shiftKey && n.target.tabIndex === 1) && n.preventDefault()
    }
}

function addRow(n, t, i, r, u, f, e) {
    var h;
    if (nLR && !i && !r && !oR["r" + n] && !validRow(nLR)) {
        --nR;
        return
    }
    var o = oT.insertRow(-1),
        l = o.insertCell(0),
        a = o.insertCell(1),
        v = o.insertCell(2),
        w = o.insertCell(3),
        y = o.insertCell(4),
        p = o.insertCell(5),
        b = o.firstChild,
        c = n + '" rows="1">',
        s;
    if (o.id = "r_" + n, nCI === 1)
        if (e !== "all" && e) {
            for (h = 0; h < aC.length; ++h)
                if (e === aC[h].k) {
                    s = aC[h].n;
                    break
                }
        } else s = chrome.i18n.getMessage("optionsProfilesMenuUnfiled");
    o.cat = e && e !== "all" ? e : "";
    l.innerHTML = getDivHtml("t", n, t);
    l.col = "t";
    oO.vars && a.setAttribute("data-id", "n" + n);
    a.innerHTML = "<textarea" + (t === 4 ? " disabled" : "") + ' id="n_' + c + i + "</textarea>";
    oO.vars && v.setAttribute("data-id", "v" + n);
    v.innerHTML = t === 0 || t === 4 ? '<textarea id="v_' + c + r + "</textarea>" : '<input id="v_' + n + '"' + (t === 1 && oO.mask ? ' type="password"' : "") + ' value="' + escapeQuotes(r) + '">';
    w.innerHTML = '<textarea id="s_' + c + u + "</textarea>";
    y.innerHTML = getDivHtml("o", n, f, t > 1 || isBackupCat || s && s.indexOf(sBackup) === 0);
    y.col = "o";
    p.innerHTML = '<button id="d_' + n + '" title="' + chrome.i18n.getMessage("removeRuleTT") + " (" + sK + '+X)">&ndash;</button><button id="m_' + n + '" title="' + (s ? chrome.i18n.getMessage("optionsProfileTT") + ": " + s + "\n" : "") + chrome.i18n.getMessage("moveRuleTT") + " (" + sK + '+M)">' + (s ? "<span>" + s + "</span> " : "") + "&rsaquo;</button>";
    p.title = chrome.i18n.getMessage("reorderRuleTT");
    D.getElementById("t_" + n).selectedIndex = t;
    D.getElementById("o_" + n).selectedIndex = f;
    i || r || oR["r" + n] || (D.getElementById("n_" + n).focus(), tableDnD && tableDnD.init(oT), disableButtons("fields", !1, !1));
    nLR = +n
}

function buildRules(n) {
    if (oT.classList.toggle("view-all", nCI === 1), oT.rows.length > 1)
        while (oT.rows.length > 1) oT.deleteRow(-1);
    for (var t in oR)(n === "all" || n === oR[t].c) && addRow(t.slice(1), oR[t].t, oR[t].n, oR[t].v, oR[t].s, oR[t].o, oR[t].c);
    tableDnD || (tableDnD = new TableDnD);
    tableDnD.init(oT)
}

function delRow(n) {
    var i = n.rowIndex,
        t;
    oErr.fields.splice(n.rowIndex, 1);
    n.remove();
    err("fields") ? disableButtons("fields", !0, !1) : (disableButtons("fields", !1, !1), showStatus());
    nLR = +oT.rows[oT.rows.length - 1].id.slice(2);
    t = oT.rows[i] || oT.rows[i - 1];
    t.id.indexOf("r_") === 0 && t.querySelector("div").focus()
}

function expandBox(n, t) {
    arguments.callee.caller.arguments.callee.caller || n.nodeName === "TEXTAREA" && (t ? n.clientHeight < n.scrollHeight ? setTimeout(function() {
        n.rows = Math.min(Math.round(n.scrollHeight / 16), 10);
        n.rows === 10 && (n.style.overflow = "auto");
        n.scrollIntoViewIfNeeded()
    }, 100) : (window.event && window.event.key === "Backspace" && n.rows > 1 && (n.rows = 1, n.rows = Math.min(Math.round(n.scrollHeight / 16), 10)), n.scrollIntoViewIfNeeded()) : n.rows > 1 && !bM && setTimeout(function() {
        n.style.overflow = "hidden";
        n.rows = 1
    }, 100))
}

function getDivHtml(n, t, i, r) {
    return oMenu[n] ? '<div id="' + n + "_" + t + '" tabindex="0"' + (r ? ' class="disabled"' : "") + ">" + oMenu[n][i] + "</div>" : ""
}

function moveRow(n, t) {
    var u, i, r;
    switch (t.key) {
        case "ArrowUp":
            t.altKey ? (i = D.getElementById("r_" + n.id.slice(2)), i.rowIndex > 1 && (bM = !0, n.readOnly = !0, i.parentNode.insertBefore(i, i.previousSibling), bM = !1, err("fields") ? oErr.refresh() : disableButtons("fields", !1, !1), n.focus())) : n.parentNode.parentNode.previousSibling.id && (n.type !== "textarea" || n.selectionEnd - n.selectionStart === n.value.length || n.selectionStart === 0) && (t.preventDefault(), r = D.getElementById(n.id.slice(0, 1) + "_" + n.parentNode.parentNode.previousSibling.id.slice(2)), setTimeout(function() {
                expandBox(n, 0)
            }, 100), r.focus(), r.select());
            break;
        case "ArrowDown":
            t.altKey ? (i = D.getElementById("r_" + n.id.slice(2)), i.nextSibling && (bM = !0, n.readOnly = !0, i.parentNode.insertBefore(i, i.nextSibling.nextSibling), bM = !1, err("fields") ? oErr.refresh() : disableButtons("fields", !1, !1), n.focus())) : n.parentNode.parentNode.nextSibling && (n.type !== "textarea" || n.selectionEnd - n.selectionStart === n.value.length || n.selectionStart === n.value.length) && (t.preventDefault(), r = D.getElementById(n.id.slice(0, 1) + "_" + n.parentNode.parentNode.nextSibling.id.slice(2)), setTimeout(function() {
                expandBox(n, 0)
            }, 100), r.focus(), r.select())
    }
}

function renderMenu(n) {
    var t, u, r, i;
    if (n.className !== "disabled" && (t = n.id.slice(0, 1), u = n.id.slice(2), oMenu[t] && t === n.parentNode.col)) {
        for (resetMenus(), r = '<select id="' + t + "_" + u + '">', i = 0; i < oMenu[t].length; ++i) r += "<option" + (i === n.selectedIndex ? " selected" : "") + ">" + oMenu[t][i] + "</option>";
        return r += "</select>", n.outerHTML = r, n = D.getElementById(t + "_" + u), n.onblur = resetMenus, n.onmouseout = resetMenus, n
    }
}

function resetMenus() {
    for (var t = [].slice.call(oTB.querySelectorAll("select")), n = 0; n < t.length; ++n) {
        var i = t[n].id.slice(0, 1),
            r = t[n].id.slice(2),
            u = t[n].selectedIndex;
        t[n].onblur = null;
        t[n].outerHTML = getDivHtml(i, r, u);
        D.getElementById(i + "_" + r).selectedIndex = u
    }
}

function resizeTable() {
    oO.scale && (D.body.classList.add("fluid-table"), oTB.style.height = Math.max(H - 228, 70) + "px")
}

function validRow(n, t, i) {
    if (oT.rows.length > 1 && (err("fields") || !t || oR["r" + n] && t.value !== oR["r" + n][t.id.slice(0, 1)])) {
        var s, y = oR["r" + n],
            c = D.getElementById("r_" + n),
            o = c.rowIndex,
            p = D.getElementById("t_" + n),
            f = p.selectedIndex,
            r = D.getElementById("n_" + n),
            u = D.getElementById("v_" + n),
            e = D.getElementById("s_" + n),
            l = D.getElementById("o_" + n),
            h = D.getElementById("m_" + n),
            a = i && i.type === "click",
            w = i && i.type === "change",
            v = function() {
                return r.style.background || u.style.background || e.style.background
            };
        if (w && (c.childNodes[2].innerHTML = f === 0 || f === 4 ? '<textarea id="v_' + n + '" rows="1">' + u.value + "</textarea>" : '<input id="v_' + n + '"' + (f === 1 && oO.mask ? ' type="password"' : "") + ' value="' + escapeQuotes(u.value) + '">', u = D.getElementById("v_" + n), f === 4 ? (r.oldValue = r.value, r.value = "", r.disabled = !0) : (r.value || (r.value = r.oldValue || ""), r.disabled = !1), l.selectedIndex > 4 ? (u.oldValue = u.value, u.value = "", u.disabled = !0) : (u.value || (u.value = u.oldValue || ""), u.disabled = !1), l.classList.toggle("disabled", f > 1 || h.textContent.indexOf(sBackup) === 0), r.disabled ? u.focus() : r.focus(), !y && !err("fields"))) return;
        if (validRegex(r.value) ? validRegex(e.value) ? r.value || u.value ? v() && (r.style.background = u.style.background = e.style.background = "", oErr.fields[o] = "", s = "", err("fields") || showStatus()) : (e.style.background = "", f === 1 || r.disabled ? (r.style.background = "", u.style.background = sErrBg, u.focus()) : (r.style.background = sErrBg, r.focus()), oErr.fields[o] = 1) : (e.style.background = sErrBg, e.focus(), oErr.fields[o] = 1, s = chrome.i18n.getMessage("statusInvalidRegex")) : (r.style.background = sErrBg, r.focus(), oErr.fields[o] = 1, s = chrome.i18n.getMessage("statusInvalidRegex")), v() || err("fields")) {
            if (showStatus(s || oErr.msg, 1, "fields"), oErr.fields[o]) h.disabled = !0;
            else if (a) return !0;
            return !1
        }
        a || disableButtons("fields", !1, !1);
        h.disabled = !1;
        oErr.isOn() && showStatus()
    }
    return !0
}

function changeCat(n) {
    var t = oC[oC.selectedIndex].text;
    if (isBackupCat = t.indexOf(sBackup) === 0, n instanceof Event) {
        if (t.indexOf("——") === 0) {
            oC.selectedIndex = nCI;
            return
        }
        if (t.indexOf(chrome.i18n.getMessage("optionsProfilesMenuManage")) === 0) {
            showCats();
            return
        }
        if (bFRS === !1) {
            showDiscard();
            oC.selectedIndex = nCI;
            D.getElementById("button-discard").addEventListener("click", function() {
                changeCat(+this.getAttribute("data-catnow"));
                showBox();
                showStatus()
            }, {
                once: !0
            });
            return
        }
        nCI = oC.selectedIndex;
        isBackupCat || (nCI2 = nCI);
        buildRules(oC.value);
        chrome.storage.local.get("catnow", function() {
            chrome.runtime.lastError || (isBackupCat || BG.updateCatMenu(nCI2), storageSet({
                catnow: nCI2
            }))
        })
    } else nCI = n, isBackupCat || (nCI2 = nCI), oC.selectedIndex = n, chrome.storage.local.get("catnow", function() {
        chrome.runtime.lastError || (isBackupCat || aC.length + 4 !== oC.length - 1 || BG.updateCatMenu(nCI2), storageSet({
            catnow: nCI2
        }).then(function() {
            loadOptions("fields")
        }))
    });
    loadOptions("cats")
}

function popCats(n) {
    var u = 0,
        t, i, r, f;
    for (isNaN(n) && (n = nCI), oC.length = 5, t = 0; t < aC.length; ++t) {
        i = D.createElement("option");
        i.value = aC[t].k;
        i.text = aC[t].n;
        r = 0;
        for (f in oR) aC[t].k === oR[f].c && ++r;
        u += r;
        r > 0 && (i.text += " (" + r + ")");
        oC.add(i)
    }
    nRL = Object.size(oR);
    nRL > 0 && (oC[1].text = oC[1].text.replace(/^([^(]+)\b.*$/, "$1 (" + nRL + ")"), oC[2].text = oC[2].text.replace(/^([^(]+)\b.*$/, nRL > u ? "$1 (" + (nRL - u) + ")" : "$1"));
    n > aC.length + 4 && storageSet({
        catnow: n = nCI = nCI2 = 2
    });
    oC.selectedIndex = n
}

function validCat(n, t) {
    var i, u, r;
    if (!n) return !1;
    if (i = typeof t == "function", n.length > 60) return alert(chrome.i18n.getMessage("statusProfileCharLimit")), i && t(n), !1;
    if (/^(all|unfiled|manage\.\.\.|new\.\.\.)$/i.test(n) || n.indexOf(sBackup) === 0 || n.indexOf("——") === 0) return alert(chrome.i18n.getMessage("statusProfileReserved")), i && t(n), !1;
    for (u = aC2 || aC, r = 0; r < u.length; ++r)
        if (u[r].n === n) return alert(chrome.i18n.getMessage("statusProfileDuplicate")), i && t(n), !1;
    return !0
}

function showBox(n, t, i) {
    if (!n || typeof n != "string") {
        if (clearTimeout(oB.t), oErr.isOn() && oST.textContent !== oErr.msg) return;
        var r = oTB.querySelector("tr.selected");
        r && r.classList.remove("selected");
        oB.style.display = "none";
        oB.textContent = "";
        oL.style.backgroundColor = "rgba(0,0,0,0)";
        oS.firstChild.style.boxShadow = oSBs;
        setTimeout(function() {
            oL.style.display = "none"
        }, 400);
        setAccessKeys(D.body.id);
        return
    }
    oB.innerHTML = (t ? "<header><h2>" + t + "</h2></header>" : "") + n + '<footer><button id="button-close">' + chrome.i18n.getMessage(i === undefined ? "buttonsClose" : "buttonsCancel") + "</button>" + (i || "") + "</footer>";
    oL.style.display = "flex";
    setTimeout(function() {
        oL.style.backgroundColor = "rgba(0,0,0,0.8)"
    }, 50);
    oB.style.maxHeight = H - 60 + "px";
    oS.firstChild.style.boxShadow = oSBs;
    setAccessKeys();
    oBC = D.getElementById("button-close");
    oB.t = setTimeout(function() {
        oB.style.display = "block";
        oB.scrollTop > 0 && (oB.scrollTop = 0);
        D.getElementById("changelog") ? oB.focus() : oB.querySelector("button,input,select").focus()
    }, 250);
    oBC.addEventListener("click", showBox, {
        once: !0
    })
}

function showCats() {
    if (oC.selectedIndex = nCI, bFRS === !1) {
        showDiscard();
        D.getElementById("button-discard").addEventListener("click", function() {
            loadOptions("fields");
            setTimeout(showCats, 100)
        }, {
            once: !0
        });
        return
    }
    var t = '<p></p><select id="content-catlist" size="13"></select><button id="button-new" accesskey="n">' + chrome.i18n.getMessage("buttonsProfileNew") + '</button><br><button id="button-rename" accesskey="r" disabled>' + chrome.i18n.getMessage("buttonsProfileRename") + '</button><br><button id="button-movefirst" accesskey="i" disabled>' + chrome.i18n.getMessage("buttonsProfileMoveFirst") + '</button><br><button id="button-moveup" accesskey="u"" disabled>' + chrome.i18n.getMessage("buttonsProfileMoveUp") + '</button><br><button id="button-movedown" accesskey="w" disabled>' + chrome.i18n.getMessage("buttonsProfileMoveDown") + '</button><br><button id="button-movelast" accesskey="l" disabled>' + chrome.i18n.getMessage("buttonsProfileMoveLast") + '</button><br><button id="button-delete" accesskey="t" disabled>' + chrome.i18n.getMessage("buttonsProfileDelete") + '</button><br><button id="button-duplicate" accesskey="p" disabled>' + chrome.i18n.getMessage("buttonsProfileDuplicate") + '</button><br><button id="button-sort" accesskey="s"' + (aC.length < 2 ? " disabled" : "") + ">" + chrome.i18n.getMessage("buttonsProfilesSort") + "</button><br><br>",
        n = aC.length;
    for (oR2 = {}, nR2 = nR, aC2 = [], nC2 = nC, aCD = [], oSites = {}; n--;) aC2[n] = aC[n];
    showBox(t, chrome.i18n.getMessage("optionsProfilesManageProfiles"), '<button id="button-saveclose" disabled>' + chrome.i18n.getMessage("buttonsSaveClose") + "</button>");
    oCL = D.getElementById("content-catlist");
    oBCN = D.getElementById("button-new");
    oBCR = D.getElementById("button-rename");
    oBCMF = D.getElementById("button-movefirst");
    oBCMU = D.getElementById("button-moveup");
    oBCMD = D.getElementById("button-movedown");
    oBCML = D.getElementById("button-movelast");
    oBCD = D.getElementById("button-delete");
    oBCC = D.getElementById("button-duplicate");
    oBCS = D.getElementById("button-sort");
    oBSC = D.getElementById("button-saveclose");
    popCatList();
    oCL.addEventListener("change", handleCatList);
    oBCN.addEventListener("click", doNewCat);
    oBCR.addEventListener("click", doRenameCat);
    oBCMF.addEventListener("click", doMoveCatFirst);
    oBCMU.addEventListener("click", doMoveCatUp);
    oBCMD.addEventListener("click", doMoveCatDown);
    oBCML.addEventListener("click", doMoveCatLast);
    oBCD.addEventListener("click", doDelCat);
    oBCC.addEventListener("click", doCopyCat);
    oBCS.addEventListener("click", doSortCats);
    oBSC.addEventListener("click", function() {
        aC2 && saveCats();
        showBox()
    }, {
        once: !0
    });
    nCI > 4 && (oCL.selectedIndex = nCI - 5, oCL.dispatchEvent(eChange), oCL.oldCat = oC[nCI].value, setTimeout(function() {
        oCL.options[oCL.selectedIndex].scrollIntoViewIfNeeded()
    }, 250))
}

function popCatList(n, t) {
    var u = D.createDocumentFragment(),
        r, i;
    for (oCL.options.length = 0, i = 0; i < aC2.length; ++i) r = u.appendChild(D.createElement("option")), r.text = aC2[i].n, r.value = aC2[i].k, (i === t || aC2[i].k === t) && (r.selected = !0);
    oCL.appendChild(u);
    n && (oCL.changed = !0, oCL.dispatchEvent(eChange))
}

function saveCats() {
    var t, i, n;
    if (oCL.changed) {
        aC = aC2;
        nC = nC2;
        for (n in oR)
            if (aCD.indexOf(oR[n].c) > -1) delete oR[n];
            else if (aC.length)
            for (t = 0, i = aC.length; t < i; ++t) {
                if (oR[n].c === aC[t].k) break;
                t === i - 1 && (oR[n].s || (oR[n].s = oSites[oR[n].c] || ""), oR[n].c = "")
            } else oR[n].s || (oR[n].s = oSites[oR[n].c] || ""), oR[n].c = "";
        if (aC.length && oCL.oldCat)
            for (nCI = nCI2 = 2, n = 0; n < aC.length; ++n)
                if (aC[n].k === oCL.oldCat) {
                    nCI = n + 5;
                    aC[n].n.indexOf(sBackup) !== 0 && (nCI2 = nCI);
                    break
                }
        if (Object.size(oR2) > 0)
            for (n in oR2) oR[n] = oR2[n];
        nR = Math.max(nR, nR2);
        storageSet({
            rulecount: nR,
            rules: JSON.stringify(oR)
        }).then(function() {
            saveOptions("cats");
            popCats();
            oC.selectedIndex = oCL.newCat ? oC.querySelector('option[value="' + oCL.newCat + '"]').index : nCI > 4 ? nCI : Math.min(nCI, 2);
            oC.dispatchEvent(eChange);
            showStatus(chrome.i18n.getMessage("statusProfilesSaved"), 0)
        })
    } else oST.textContent && (err("fields") ? oST.textContent = oErr.msg : showStatus())
}

function doNewCat(n) {
    var i, r, t;
    (n instanceof Event && (n = ""), i = (prompt(chrome.i18n.getMessage("promptProfileName") + ":", n || "") || "").trim(), validCat(i, doNewCat)) && (r = oCL.selectedIndex, t = {
        k: "c" + nC2++,
        n: i,
        s: ""
    }, r < 0 ? aC2.push(t) : aC2.splice(r + 1, 0, t), popCatList(!0, t.k), oCL.newCat = t.k)
}

function doRenameCat(n) {
    n instanceof Event && (n = "");
    var t = oCL.selectedIndex,
        i = (prompt(chrome.i18n.getMessage("promptNewProfileName") + ":", n || aC2[t].n) || "").trim();
    i !== aC2[t].n && validCat(i, doRenameCat) && (aC2[t].n = i, popCatList(!0, t))
}

function doMoveCatFirst() {
    var n = oCL.selectedIndex,
        t = aC2[n];
    aC2.splice(n, 1);
    aC2.unshift(t);
    popCatList(!0, 0)
}

function doMoveCatUp() {
    var n = oCL.selectedIndex,
        t = aC2[n];
    aC2.splice(n, 1);
    aC2.splice(n - 1, 0, t);
    popCatList(!0, n - 1)
}

function doMoveCatDown() {
    var n = oCL.selectedIndex,
        t = aC2[n];
    aC2.splice(n, 1);
    aC2.splice(n + 1, 0, t);
    popCatList(!0, n + 1)
}

function doMoveCatLast() {
    var n = oCL.selectedIndex,
        t = aC2[n];
    aC2.splice(n, 1);
    aC2.push(t);
    popCatList(!0, aC2.length - 1)
}

function doDelCat() {
    var n = oCL.selectedIndex;
    oSites[aC2[n].k] = aC2[n].s;
    confirm(chrome.i18n.getMessage("confirmProfileDelete")) && aCD.push(aC2[n].k);
    aC2.splice(n, 1);
    popCatList(!0, Math.min(n, aC2.length - 1))
}

function doCopyCat() {
    var t = oCL.selectedIndex,
        r = "c" + nC2++,
        i = {
            k: r,
            n: aC2[t].n + " [Copy]",
            s: aC2[t].s
        },
        n;
    t < 0 ? aC2.push(i) : aC2.splice(t + 1, 0, i);
    popCatList(!0, i.k);
    oCL.newCat = i.k;
    for (n in oR) oR[n].c === aC2[t].k && (oR2["r" + nR2++] = {
        t: oR[n].t,
        n: oR[n].n,
        v: oR[n].v,
        s: oR[n].s,
        o: oR[n].o,
        c: r
    })
}

function doSortCats() {
    aC2.sort(sortByName);
    popCatList(!0, oCL.value)
}

function handleCatList() {
    var n = oCL.selectedIndex,
        t = oCL.options[n];
    oBCR.disabled = oBCD.disabled = oBCC.disabled = !t;
    oBCS.disabled = aC2.length < 2;
    t ? (oBCMF.disabled = oBCMU.disabled = n === 0, oBCMD.disabled = oBCML.disabled = n === oCL.options.length - 1) : oBCMF.disabled = oBCMU.disabled = oBCMD.disabled = oBCML.disabled = !0;
    oCL.changed && (oBSC.disabled = !1)
}

function showDiscard() {
    showBox("<p>" + chrome.i18n.getMessage("statusUnsavedChanges") + "</p>", chrome.i18n.getMessage("optionsFieldsConfirmation"), '<button id="button-discard" data-catnow="' + oC.selectedIndex + '">' + chrome.i18n.getMessage("buttonsDiscardContinue") + "</button>")
}

function showMoveRule(n) {
    for (var r = "<p>" + chrome.i18n.getMessage("optionsFieldsSelectProfile") + '</p><p><select id="select-cat" accesskey="p"><option value="">' + chrome.i18n.getMessage("optionsProfilesMenuUnfiled") + "</option>", t = 0; t < aC.length; ++t) r += '<option value="' + aC[t].k + '"' + (aC[t].k === n.cat ? " selected" : "") + (aC[t].n.indexOf(sBackup) === 0 ? " hidden" : "") + ">" + aC[t].n + "</option>";
    r += '<option value="new" class="menu-action">' + chrome.i18n.getMessage("optionsProfilesMenuNew") + "</option></select></p>";
    n.classList.add("selected");
    showBox(r, chrome.i18n.getMessage("optionsFieldsMove"), "");
    var u = n.id.slice(2),
        i = D.getElementById("select-cat"),
        e = i.selectedIndex === 0 ? 2 : i.selectedIndex + 4,
        f = function(n) {
            var t, r;
            if (n === undefined && (n = ""), t = (prompt(chrome.i18n.getMessage("promptProfileName") + ":", n || "") || "").trim(), !validCat(t, f)) {
                i.selectedIndex = e - 4;
                return
            }
            r = "c" + nC++;
            aC.push({
                k: r,
                n: t,
                s: D.getElementById("s_" + u).value || oCS.value
            });
            moveRule(u, r, t);
            saveOptions("cats")
        };
    i.addEventListener("change", function() {
        this.value === "new" ? f() : moveRule(u, this.value, this.options[this.selectedIndex].text)
    })
}

function moveRule(n, t, i) {
    var r = D.getElementById("r_" + n),
        u;
    setRule(r, t);
    nCI > 1 ? r.parentNode.removeChild(r) : (u = D.getElementById("m_" + n), u.firstChild.textContent = i, u.title = chrome.i18n.getMessage("optionsProfileTT") + ": " + i + "\n" + chrome.i18n.getMessage("moveRuleTT") + " (" + sK + "+M)", r.cat = t);
    storageSet({
        rulecount: nR,
        rules: JSON.stringify(oR)
    }).then(function() {
        showBox();
        oErr.isOn() || (popCats(oC.selectedIndex), disableButtons("fields", !0, !0), showStatus(chrome.i18n.getMessage("statusRuleMoved").replace(/___/, i), 0))
    })
}

function showWhatsNew() {
    showBox(sChangelog)
}

function importCSV(n) {
    var i = (typeof n == "string" ? n : oIE.value).trim(),
        f, t, u, r = oIA.checked,
        o, e = {},
        v = 0,
        s = 0,
        l = (i.match(/^r?\d/gm) || []).length,
        a, h = 0,
        c;
    i && (showStatus(chrome.i18n.getMessage("statusPreparingData"), 2), setTimeout(function() {
        if (i = i.replace(/^[ \r\n]*|[ \r\n]*$/g, ""), i = i.replace(/@@/g, "\\@\\@"), i = i.replace(/~~/g, "\\~\\~"), i = i.replace(/%%/g, "\\%\\%"), i = i.replace(/\r?\n/g, "@@"), / ###,,/.test(i) ? (i = i.replace(/,(?=[^"]*"(?:[^"]*"[^"]*")*[^"]*$)/g, "~~"), i = i.replace(/@@([^"]+?,)/g, "\n$1"), u = ",") : / ###\t\t/.test(i) && (i = i.replace(/\t(?=[^"]*"(?:[^"]*"[^"]*")*[^"]*$)/g, "%%"), i = i.replace(/@@([^"]+?\t)/g, "\n$1"), u = "\t"), f = i.split("\n"), c = f.length, !u || c === 0 || f[0].split(u).length < 5) {
            showStatus(chrome.i18n.getMessage("statusImportFailed"), 1);
            setTimeout(showStatus, 4e3);
            return
        }
        r || (oR = {}, nR = 1, aC = [], nC = 1);
        nCI = nCI2 = 1;
        oErr.fields = [];
        a = setInterval(function() {
            var n;
            for (t = f[h].split(u), n = 0; n < t.length; ++n)(u === "," || /^(".*?""[^"]*"".*?"|"[^"]+")$/.test(t[n])) && (t[n] = t[n].replace(/^"|"$/g, ""), t[n] = t[n].replace(/""/g, '"')), t[n] = t[n].replace(/%%/g, "\t"), t[n] = t[n].replace(/~~/g, ","), t[n] = t[n].replace(/@@/g, "\n"), t[n] = t[n].replace(/\\%\\%/g, "%%"), t[n] = t[n].replace(/\\~\\~/g, "~~"), t[n] = t[n].replace(/\\@\\@/g, "@@");
            if (t[0] = t[0].toLowerCase(), /^c\d+/.test(t[0])) {
                if (o = !1, r)
                    for (n = 0; n < aC.length; ++n)
                        if (aC[n].n.toLowerCase() === t[1].toLowerCase()) {
                            e[t[0]] = aC[n].k;
                            o = !0;
                            break
                        }
                o || (showStatus(chrome.i18n.getMessage("statusImportingProfile", [t[1]]), 2), aC.push({
                    k: r ? "c" + nC++ : t[0],
                    n: t[1],
                    s: t[2],
                    h: isNaN(parseInt(t[3])) ? t[3] : ""
                }), e[t[0]] = aC[aC.length - 1].k);
                r || (nC = Math.max(nC, +t[0].slice(1)) + 1)
            } else if (/^r\d+/.test(t[0]) || !isNaN(parseInt(t[0]))) showStatus(chrome.i18n.getMessage("statusImportingRule", [++v, l]), 2), t.length === 7 ? (oR[r ? "r" + nR++ : t[0]] = {
                t: +t[1],
                n: t[2],
                v: t[3],
                s: t[4],
                o: +t[5],
                c: r ? e[t[6]] : t[6]
            }, r || (++nR, s = Math.max(+t[0].slice(1), l, s))) : oR["r" + nR++] = {
                t: +t[0],
                n: t[1],
                v: t[2],
                s: t[3],
                o: +(+t[0] < 2 && oO.overwrite),
                c: r ? e[t[4]] : t[4]
            };
            else if (t[0].indexOf("advanced") === 0) showStatus(chrome.i18n.getMessage("statusImportingAdvanced"), 2), oTAA.value = JSON.parse(t[1]).join("\n"), disableButtons("advanced", !1, !1);
            else if (t[0].indexOf("exceptions") === 0) showStatus(chrome.i18n.getMessage("statusImportingExceptions"), 2), oTAE.value = JSON.parse(t[1]).join("\n"), disableButtons("exceptions", !1, !1);
            else if (t[0].indexOf("textclips") === 0) showStatus(chrome.i18n.getMessage("statusImportingTextClips"), 2), oTAT.value = JSON.parse(t[1]).join("\n===\n"), disableButtons("textclips", !1, !1);
            else if (t[0].indexOf("variables") === 0) showStatus(chrome.i18n.getMessage("statusImportingVariables"), 2), oTAV.value = JSON.parse(t[1]).join("\n"), disableButtons("variables", !1, !1);
            else {
                for (n in oOO) n === t[0] && (showStatus(chrome.i18n.getMessage("statusImportingOption", [n]), 2), oO[n] = oOO[n].checked = +t[1]);
                switch (t[0]) {
                    case "autoimport":
                        oIU.value = t[2];
                        break;
                    case "backup":
                        oBU.disabled = !+t[1];
                        oBU.value = t[2];
                        break;
                    case "delay":
                        oD.disabled = !+t[1];
                        oD.value = t[2];
                        oDO.textContent = oD.value;
                        break;
                    case "voice":
                        oV.disabled = !+t[1];
                        oV.selectedIndex = +t[2]
                }
                storageSet({
                    other: oO,
                    backup: +oBU.value,
                    delay: +oD.value,
                    voice: oV.selectedIndex
                })
            }++h;
            h === c && (clearInterval(a), nR = Math.max(nR, ++s), loadOptions("cats"), popCats(), buildRules("all"), disableButtons("fields", !1, !1), showStatus(chrome.i18n.getMessage("statusSettingsImported"), 0))
        }, 10)
    }, 250))
}

function importURL() {
    if (oIU.value) {
        var n = new XMLHttpRequest,
            t = function() {
                n.readyState === 4 && importCSV(n.response.trim())
            };
        n.onreadystatechange = t;
        n.open("GET", oIU.value);
        n.setRequestHeader("cache-control", "max-age=0, no-cache, no-store");
        n.setRequestHeader("pragma", "no-cache");
        n.send()
    }
}

function exportCSV() {
    for (var t = "### " + sExtName.toUpperCase() + " PROFILES ###,,,,,,\nProfile ID,Name,Site,Hotkey,,,\n", n = 0; n < aC.length; ++n) t += aC[n].k + "," + aC[n].n + "," + aC[n].s + "," + (aC[n].h || "") + ",,,\n";
    t += "### " + sExtName.toUpperCase() + " RULES ###,,,,,,\nRule ID,Type,Name,Value,Site,Mode,Profile\n";
    for (n in oR) t += n + "," + oR[n].t + ',"' + oR[n].n.replace(/"/g, '""') + '","' + oR[n].v.replace(/"/g, '""') + '","' + oR[n].s.replace(/"/g, '""') + '",' + (oR[n].o === undefined ? +(oR[n].t < 2 && oO.overwrite) : oR[n].o) + "," + oR[n].c + "\n";
    t += "### " + sExtName.toUpperCase() + ' OPTIONS ###,,,,,,\nadvanced,"' + JSON.stringify(aA).replace(/"/g, '""') + '",,,,,\nexceptions,"' + JSON.stringify(aE).replace(/"/g, '""') + '",,,,,\ntextclips,"' + JSON.stringify(aT).replace(/"/g, '""') + '",,,,,\nvariables,"' + JSON.stringify(aV).replace(/"/g, '""') + '",,,,,';
    chrome.storage.local.get(["autoimport", "backup", "delay", "voice"], function(n) {
        if (!chrome.runtime.lastError) {
            for (var i in oOO) t += "\n" + i + "," + (+oO[i] || 0), t += n[i] ? "," + n[i] + ",,,," : ",,,,,";
            oIE.value = t;
            oIE.select();
            showStatus(chrome.i18n.getMessage("statusSettingsExported"), 0)
        }
    })
}

function delegateChange(n) {
    for (var t = n.target; t && t !== this; t = t.parentNode)
        if (t.matches("select")) {
            validRow(t.id.slice(2), null, n);
            break
        }
}

function delegateClick(n) {
    for (var i, t = n.target; t && t !== this; t = t.parentNode)
        if (t.matches("button")) {
            i = t.parentNode.parentNode;
            switch (t.id.slice(0, 1)) {
                case "d":
                    delRow(i);
                    break;
                case "m":
                    if (!validRow(t.id.slice(2), null, n)) return;
                    showMoveRule(i)
            }
            break
        }
}

function delegateFocus(n) {
    var t = n.target,
        i, r;
    if (t.nodeName === "DIV") t = renderMenu(t), t && t.focus();
    else
        while (t && t !== this) {
            if (t.matches("input,select,textarea")) {
                i = "accesskey";
                r = t.id.slice(2);
                D.getElementById("d_" + r).setAttribute(i, "x");
                D.getElementById("m_" + r).setAttribute(i, "m");
                expandBox(t, 1);
                t.addEventListener("blur", function() {
                    D.getElementById("d_" + r).removeAttribute(i);
                    D.getElementById("m_" + r).removeAttribute(i);
                    expandBox(t, 0)
                }, {
                    once: !0
                });
                break
            }
            t = t.parentNode
        }
}

function delegateKeyDown(n) {
    for (var t = n.target; t && t !== this; t = t.parentNode)
        if (t.matches("input,textarea")) {
            moveRow(t, n);
            break
        }
}

function delegateKeyUp(n) {
    for (var t = n.target; t && t !== this; t = t.parentNode)
        if (t.matches("input,textarea")) {
            n.code.indexOf("Alt") === 0 && setTimeout(function() {
                t.readOnly = !1;
                t.blur();
                t.focus()
            }, 100);
            t.type === "textarea" && expandBox(t, 1);
            validRow(t.id.slice(2), t);
            break
        }
}

function delegateMouseOver(n) {
    if (!oCT) {
        var t = n.target;
        t.nodeName === "DIV" && renderMenu(t)
    }
}

function debounce(n) {
    var t;
    return function() {
        var i = this,
            r = arguments,
            u = function() {
                n.apply(i, r)
            };
        clearTimeout(t);
        t = setTimeout(u, 50)
    }
}

function handleHotkeyUp(n) {
    var i, t;
    if ((n.ctrlKey || n.altKey || n.metaKey) && n.key !== "Control" && n.key !== "Shift" && n.key !== "Alt" && n.key !== "Meta") {
        if (i = oCH.modifier + (n.key.length > 1 ? n.key.replace(/([A-Z])/g, " $1").trim() : n.key === " " ? "Space" : n.key.toUpperCase()), i === oCH.hotkey) return;
        for (t = 0; t < aC.length; ++t)
            if (aC[t].h === i) {
                alert(chrome.i18n.getMessage("statusHotkeyDuplicate").replace(/___/, aC[t].n));
                resetHotkey();
                return
            }
        oCH.value = oCH.hotkey = aC[nCI - 5].h = i;
        saveOptions("cats")
    } else n.key === "Backspace" && (oCH.value = aC[nCI - 5].h = "", oCH.hotkey = oCH.modifier = undefined, saveOptions("cats"));
    oCH.blur()
}

function resetHotkey() {
    setTimeout(function() {
        oCH.value = oCH.hotkey || ""
    }, 100)
}

function handleHashChange() {
    var n = location.hash.slice(1) || "fields";
    n !== D.body.id && activateTab(n)
}

function handleKeyDown(n) {
    D.activeElement.id !== "content-hotkey" && (n.key === "Escape" && oBC && oL.style.display === "flex" ? oBC.click() : D.body.id === "fields" && n.altKey && n.key === "g" ? showCats() : D.body.id === "other" && n.altKey && n.key === "p" && oL.style.display !== "flex" && (oIA.checked ? oIA.focus() : oIR.focus()))
}

function init() {
    [].forEach.call(D.querySelectorAll("[data-i18n]"), function(n) {
        var t = chrome.i18n.getMessage(n.getAttribute("data-i18n")),
            i = chrome.i18n.getMessage(n.getAttribute("data-i18n") + "TT");
        t && (n.innerHTML = t);
        i && (n.title = i)
    });
    [].forEach.call(D.querySelectorAll(".tt-anchor"), function(n) {
        n.addEventListener("mousemove", function(n) {
            oTT && oTT.style.display === "block" && tooltip.pos(n)
        })
    });
    loadOptions()
}

function refresh() {
    chrome.storage.local.get(["catnow", "cats", "rules"], function(n) {
        chrome.runtime.lastError || (nCI !== n.catnow || aC.length !== n.cats.length || JSON.stringify(aC) !== JSON.stringify(n.cats) || JSON.stringify(oR) !== n.rules) && (loadOptions("fields"), loadOptions("cats"), updateDataSize())
    })
}
Element.prototype.scrollIntoViewIfNeeded || (Element.prototype.scrollIntoViewIfNeeded = Element.prototype.scrollIntoView);
Object.size = function(n) {
    var t = 0;
    for (var i in n) n.hasOwnProperty(i) && ++t;
    return t
};
var D = document,
    W, H, BG, sExtName = chrome.runtime.getManifest().name,
    sBackup = "Backup - ",
    oMenu = {
        t: ["Text", "Password", "Select", "Checkbox/Radio", "JavaScript"],
        o: ["Safe", "Overwrite", "Prepend", "Append", "Wrap", "Increment", "Decrement"]
    },
    oR, oR2, nR, nR2, nRL, oNF, oNA, oNE, oNT, oNV, oNIE, oNO, oNS, oND, oNW, oHN, oHV, oHS, oHM, oT, oTB, nLR, bM = !1,
    aC, aC2, nC, nC2, nCI, nCI2, aCD, oC, oCL, oCS, oCH, oSites, oBA, oBS, oBR, oBH, oBI, oBE, oBIU, oBC, oBCN, oBCR, oBCMF, oBCMU, oBCMD, oBCML, oBCD, oBCC, oBCS, oBSC, bFSS, bFRS, bASS, bARS, bESS, bERS, bTSS, bTRS, bVSS, bVRS, aA, aE, aT, aV, oTAA, oTAE, oTAT, oTAV, oO, oOO, oBU, oD, oDO, oV, oIE, oIR, oIA, oS, oST, oSBs = "0 1px 6px #333",
    oL, oB, oTT, tableDnD, eChange = new Event("change"),
    isBackupCat, isMac = navigator.platform.indexOf("Mac") > -1,
    sK = isMac ? "Option" : "Alt",
    handleHotkeyDown = debounce(function(n) {
        var t = "";
        n.ctrlKey && (t += "Ctrl + ");
        n.shiftKey && (t += "Shift + ");
        n.altKey && (t += (isMac ? "Option" : "Alt") + " + ");
        n.metaKey && (t += (isMac ? "⌘" : "Win") + " + ");
        t && t !== "Shift + " && (oCH.value = t, oCH.modifier = t)
    }),
    sErrBg = "rgb(255, 199, 206)",
    oErr = {
        msg: chrome.i18n.getMessage("statusFieldError")
    },
    err = function(n) {
        return oErr[n].indexOf(1) > -1
    };
chrome.runtime.getBackgroundPage(function(n) {
    BG = n
});
D.addEventListener("keydown", handleKeyDown);
window.addEventListener("focus", refresh);
window.addEventListener("hashchange", handleHashChange);
window.addEventListener("load", init);