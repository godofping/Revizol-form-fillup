function init() {
    chrome.storage.local.get({
        autoimport: "",
        backup: 30,
        catcount: 1,
        catnow: 1,
        cats: [],
        delay: 1,
        advanced: [],
        exceptions: [],
        textclips: [],
        variables: [],
        other: {
            autoimport: 0,
            backup: 0,
            debug: 0,
            delay: 0,
            labelmatch: 0,
            manual: 0,
            mask: 1,
            menu: 1,
            overwrite: 0,
            scale: 1,
            sound: 1,
            vars: 1,
            voice: 0
        },
        rulecount: 1,
        rules: "{}",
        ver: chrome.runtime.getManifest().version,
        voice: 1
    }, function(n) {
        var i, r, t;
        if (localStorage.length) try {
            for (n.backup = +localStorage.backup, localStorage.catcount && (n.catcount = +localStorage.catcount), n.catnow = +localStorage.catnow, n.cats = JSON.parse(localStorage.cats), n.delay = +localStorage.delay, n.exceptions = JSON.parse(localStorage.exceptions), n.other = JSON.parse(localStorage.other), n.rulecount = +localStorage.rulecount, n.ver = localStorage.ver, localStorage.voice && (n.voice = +localStorage.voice), i = JSON.parse(localStorage.rules), t = 0; t < n.cats.length; ++t) {
                for (r in i) n.cats[t].k === i[r].c && (i[r].o = n.cats[t].n.indexOf(sBackup) === 0 ? 0 : n.cats[t].o);
                delete n.cats[t].o
            }
            for (t in i) i[t].c || (i[t].o = n.other.overwrite);
            n.rules = JSON.stringify(i);
            localStorage.clear()
        } catch (u) {
            console.warn("[" + sExtName + "] localStorage to chrome.storage migration failed.")
        }
        storageSet(n);
        n.other.menu && buildMenu(n.cats, n.catnow)
    })
}

function resetCounters() {
    nFields = nFilled = nTimer = 0
}

function storageSet(n) {
    return new Promise(function(t, i) {
        chrome.storage.local.set(n, function() {
            var n = chrome.runtime.lastError;
            n ? (console.error("[" + sExtName + "] " + n.message), i(n.message)) : t()
        })
    })
}

function syncData() {
    chrome.tabs.query({}, function(n) {
        for (var t = 0; t < n.length; ++t) chrome.tabs.sendMessage(n[t].id, {
            type: "sync"
        })
    })
}

function buildMenu(n, t, i) {
    var u = i ? ["browser_action"] : ["all"],
        f = navigator.platform.indexOf("Mac") < 0 ? "Alt" : "Option",
        r;
    for (chrome.contextMenus.removeAll(), chrome.contextMenus.create({
            id: sMenuExeId,
            contexts: u,
            title: chrome.i18n.getMessage("generalExecute")
        }), chrome.contextMenus.create({
            id: sMenuTxtId,
            contexts: ["editable"],
            title: chrome.i18n.getMessage("generalInsert")
        }), chrome.contextMenus.create({
            id: sMenuExeId + "_1",
            parentId: sMenuExeId,
            contexts: u,
            type: "radio",
            title: chrome.i18n.getMessage("optionsProfilesMenuAll"),
            checked: t === 1
        }), chrome.contextMenus.create({
            id: sMenuExeId + "_2",
            parentId: sMenuExeId,
            contexts: u,
            type: "radio",
            title: chrome.i18n.getMessage("optionsProfilesMenuUnfiled"),
            checked: t === 2
        }), r = 0; r < n.length; ++r) n[r].n.indexOf(sBackup) !== 0 && chrome.contextMenus.create({
        id: sMenuExeId + "_" + (r + 5),
        parentId: sMenuExeId,
        contexts: u,
        type: "radio",
        title: n[r].n + (n[r].h ? " (" + n[r].h.replace(/ \+ /g, "+") + ")" : ""),
        checked: t === r + 5
    });
    chrome.storage.local.get("textclips", function(n) {
        var r, e, u, f, t, o, i;
        if (!chrome.runtime.lastError)
            if (r = n.textclips, r.length)
                for (e = [], u = 0; u < r.length; ++u)
                    for (f = r[u].trim().split("\n")[0].split(/ *> */), t = o = sMenuTxtId, i = 0; i < f.length; ++i) t += "_" + f[i].replace(/\W/g, "_").toLowerCase(), e.indexOf(t) < 0 && (chrome.contextMenus.create({
                        id: t,
                        parentId: o,
                        contexts: ["editable"],
                        title: f[i]
                    }, function() {
                        chrome.runtime.lastError
                    }), e.push(t)), o = t;
            else chrome.contextMenus.remove(sMenuTxtId, function() {
                chrome.runtime.lastError
            })
    });

    chrome.contextMenus.create({
        id: "cm_add_one",
        contexts: ["editable"],
        title: chrome.i18n.getMessage("generalAddRule")
    });

    i || chrome.contextMenus.create({
        id: "cm_options",
        contexts: ["page", "frame", "selection", "link", "editable", "image", "video", "audio"],
        title: chrome.i18n.getMessage("generalOptions")
    })
}

function handleMenu(n, t) {
    if (n.menuItemId.indexOf("add") > -1) showWizard(n, t, n.menuItemId.indexOf("one") > -1);
    else if (n.menuItemId === "cm_options") chrome.runtime.openOptionsPage();
    else if (n.parentMenuItemId === sMenuExeId) {
        var i = +n.menuItemId.slice((sMenuExeId + "_").length);
        resetCounters();
        storageSet({
            catnow: i
        }).then(function() {
            chrome.tabs.sendMessage(t.id, {
                type: "autofill",
                catnow: i
            })
        })
    } else n.menuItemId.indexOf(sMenuTxtId) === 0 && chrome.tabs.sendMessage(t.id, {
        type: "insertText",
        id: n.menuItemId.replace(sMenuTxtId + "_", "")
    })
}

function updateCatMenu(n) {
    chrome.contextMenus.update(sMenuExeId + "_" + n, {
        checked: !0
    })
}

function showWizard(n, t, i) {
    t === undefined && (t = n);
    chrome.browserAction.getTitle({
        tabId: t.id
    }, function(n) {
        n !== sExtName && chrome.tabs.sendMessage(t.id, {
            type: "showWizard",
            data: {
                editable: i === undefined ? !1 : i
            }
        }, function(n) {
            n && (chrome.tabs.insertCSS(t.id, {
                file: "css/wizard.css"
            }), chrome.tabs.executeScript(t.id, {
                file: "js/wizard.js"
            }))
        })
    })
}

function portMessage(n) {
    portWiz && portWiz.postMessage(n)
}

function resetPort() {
    portWiz = undefined
}

function sendRules(n) {
    setTimeout(function() {
        portMessage({
            type: "gotRules",
            data: aRules,
            field: n.field
        })
    }, 100)
}

function handleConnection(n) {
    switch (n.name) {
        case "wizard":
            portWiz = n;
            n.onDisconnect.addListener(resetPort);
            n.onMessage.addListener(handleMessage)
    }
}

function handleMessage(n, t, i) {
    var r = n.data;
    switch (n.type) {
        case "clearHighlight":
            chrome.tabs.sendMessage(t.tab.id, {
                type: "clearHighlight"
            });
            return;
        case "executeHotkey":
            resetCounters();
            storageSet({
                catnow: r.catnow
            }).then(function() {
                updateCatMenu(r.catnow);
                chrome.tabs.sendMessage(t.tab.id, {
                    type: "autofill",
                    catnow: r.catnow
                })
            });
            return;
        case "injectJquery":
            r.ver > 2 && r.ver < 4 || (r.ver = 3);
            chrome.tabs.executeScript(t.tab.id, {
                file: "js/jquery" + r.ver + ".min.js"
            }, function() {
                i({})
            });
            break;
        case "saveCat":
            chrome.storage.local.get(["catcount", "catnow", "cats"], function(n) {
                var u, t;
                if (!chrome.runtime.lastError) {
                    if (u = "c" + n.catcount++, n.cats.push({
                            k: u,
                            n: r.cat.n,
                            s: r.cat.s || ""
                        }), !r.backup) {
                        for (t = 0; t < n.cats.length; ++t)
                            if (n.cats[t].n === r.cat.n) {
                                n.catnow = t + 5;
                                break
                            }
                        buildMenu(n.cats, n.catnow)
                    }
                    storageSet(n).then(function() {
                        i({
                            catnow: n.catnow,
                            cat: u
                        })
                    })
                }
            });
            break;
        case "saveRules":
            chrome.storage.local.get(["catnow", "cats", "other", "rulecount", "rules"], function(n) {
                var l, a, v, o, y, f, t;
                if (!chrome.runtime.lastError) {
                    var c = r.rules[0].c,
                        s = "",
                        h, i, e = [],
                        u = JSON.parse(n.rules);
                    for (t = 0, l = n.cats.length; t < l; ++t) {
                        if (n.cats[t].k === c) {
                            h = t;
                            r.backup || (n.catnow = h + 5);
                            break
                        }
                        t === l - 1 && (c = "", n.catnow = 2)
                    }
                    for (n.cats[h] && (s = n.cats[h].s, s && e.push(s)), r.backup || updateCatMenu(n.catnow), i = Object.keys(u).filter(function(n) {
                            return u[n].c === c
                        }), t = 0; t < r.rules.length; ++t) {
                        for (a = r.rules[t].n, o = r.rules[t].s, o && e.indexOf(o) < 0 && e.push(o), y = !0, f = 0; f < i.length; ++f) t === 0 && u[i[f]].s && e.indexOf(u[i[f]].s) < 0 && e.push(u[i[f]].s), r.rules[t].t === u[i[f]].t && a === u[i[f]].n.replace(/\/\*.*?\*\/\s*/g, "") && (o === u[i[f]].s || o === s) && (u[i[f]].v = r.rules[t].v, y = !1);
                        y && (v = "r" + n.rulecount++, u[v] = {
                            t: r.rules[t].t,
                            n: a,
                            v: r.rules[t].v,
                            s: o,
                            o: r.rules[t].o === undefined ? +(r.rules[t].t < 2 && n.other.overwrite && !r.backup) : r.rules[t].o,
                            c: c
                        }, i.push(v))
                    }
                    if (n.cats[h]) {
                        for (t = 0; t < i.length; ++t) u[i[t]].s = e.length > 1 ? u[i[t]].s || s : "";
                        n.cats[h].s = e.length > 1 ? "" : s || e[0]
                    }
                    n.rules = JSON.stringify(u);
                    storageSet(n)
                }
            });
            return;
        case "updateStatus":
            nFields += r.fields;
            nFilled += r.filled;
            chrome.browserAction.getTitle({
                tabId: t.tab.id
            }, function(n) {
                chrome.runtime.lastError || (nFields && n === sExtName && (chrome.browserAction.setIcon({
                    tabId: t.tab.id,
                    path: {
                        "16": "images/icon16.png",
                        "24": "images/icon24.png",
                        "32": "images/icon32.png"
                    }
                }), chrome.browserAction.setTitle({
                    tabId: t.tab.id,
                    title: chrome.i18n.getMessage("buttonsGenerateRules").replace(/<\/?u>/g, "").replace("Rules", "rules")
                })), chrome.browserAction.setBadgeText({
                    text: (nFilled || "") + "",
                    tabId: t.tab.id
                }), nFilled && nTimer === 0 && chrome.storage.local.get("other", function(n) {
                    if (!chrome.runtime.lastError && n.other.sound) {
                        ++nTimer;
                        var t = new Audio(chrome.runtime.getURL("sounds/1111.ogg"));
                        t.play();
                        delete t
                    }
                }))
            });
            return;
        case "appendRules":
            aRules = aRules.concat(r);
            return;
        case "gatherRules":
            aRules = [];
            chrome.tabs.sendMessage(t.tab.id, {
                type: "create",
                cat: r
            }, sendRules);
            return
    }
    return !0
}

function handleNavigation(n) {
    n.frameId === 0 && resetCounters()
}

function handleStartup() {
    chrome.storage.local.get(["autoimport", "catnow", "cats", "other"], function(n) {
        if (n.other.menu && buildMenu(n.cats, n.catnow), !chrome.runtime.lastError && n.other.autoimport && n.autoimport) {
            var t = new XMLHttpRequest,
                i = function() {
                    var e, u;
                    if (t.readyState === 4) {
                        var r = t.response.trim(),
                            s, i, f, h, c = 0,
                            rt = (r.match(/^r?\d/gm) || []).length,
                            l, a = [],
                            w, b, k, d, o = {},
                            v = {},
                            y = 1,
                            p = 1,
                            g, nt, tt, it;
                        if (!r) return;
                        if (r = r.replace(/^[ \r\n]*|[ \r\n]*$/g, ""), r = r.replace(/@@/g, "\\@\\@"), r = r.replace(/~~/g, "\\~\\~"), r = r.replace(/%%/g, "\\%\\%"), r = r.replace(/\r?\n/g, "@@"), / ###,,/.test(r) ? (r = r.replace(/,(?=[^"]*"(?:[^"]*"[^"]*")*[^"]*$)/g, "~~"), r = r.replace(/@@([^"]+?,)/g, "\n$1"), f = ",") : / ###\t\t/.test(r) && (r = r.replace(/\t(?=[^"]*"(?:[^"]*"[^"]*")*[^"]*$)/g, "%%"), r = r.replace(/@@([^"]+?\t)/g, "\n$1"), f = "\t"), s = r.split("\n"), l = s.length, !f || l === 0 || s[0].split(f).length < 5) return;
                        for (e = 0; e < l; ++e) {
                            for (i = s[e].split(f), u = 0; u < i.length; ++u)(f === "," || /^(".*?""[^"]*"".*?"|"[^"]+")$/.test(i[u])) && (i[u] = i[u].replace(/^"|"$/g, ""), i[u] = i[u].replace(/""/g, '"')), i[u] = i[u].replace(/%%/g, "\t"), i[u] = i[u].replace(/~~/g, ","), i[u] = i[u].replace(/@@/g, "\n"), i[u] = i[u].replace(/\\%\\%/g, "%%"), i[u] = i[u].replace(/\\~\\~/g, "~~"), i[u] = i[u].replace(/\\@\\@/g, "@@");
                            if (i[0] = i[0].toLowerCase(), /^c\d+/.test(i[0])) a.push({
                                k: i[0],
                                n: i[1],
                                s: i[2],
                                h: isNaN(parseInt(i[3])) ? i[3] : ""
                            }), y = Math.max(y, +i[0].slice(1)) + 1;
                            else if (/^r\d+/.test(i[0]) || !isNaN(parseInt(i[0]))) i.length === 7 ? (v[i[0]] = {
                                t: +i[1],
                                n: i[2],
                                v: i[3],
                                s: i[4],
                                o: +i[5],
                                c: i[6]
                            }, ++p, c = Math.max(+i[0].slice(1), rt, c)) : v["r" + p++] = {
                                t: +i[0],
                                n: i[1],
                                v: i[2],
                                s: i[3],
                                o: +(+i[0] < 2 && o.overwrite),
                                c: i[4]
                            };
                            else if (i[0].indexOf("advanced") === 0) w = JSON.parse(i[1]);
                            else if (i[0].indexOf("exceptions") === 0) b = JSON.parse(i[1]);
                            else if (i[0].indexOf("textclips") === 0) k = JSON.parse(i[1]);
                            else if (i[0].indexOf("variables") === 0) d = JSON.parse(i[1]);
                            else if (i[0] === "### autofill options ###" && (h = e), h && e > h + 1 && /^[a-z]+$/.test(i[0])) {
                                o[i[0]] = +i[1];
                                switch (i[0]) {
                                    case "autoimport":
                                        g = i[2];
                                        break;
                                    case "backup":
                                        nt = +i[2];
                                        break;
                                    case "delay":
                                        tt = +i[2];
                                        break;
                                    case "voice":
                                        it = +i[2]
                                }
                            }
                        }
                        o.autoimport === undefined && (o.autoimport = 0);
                        storageSet({
                            autoimport: g || "",
                            backup: nt,
                            catcount: y,
                            catnow: n.catnow > a.length + 4 ? 2 : n.catnow,
                            cats: a,
                            delay: tt,
                            advanced: w,
                            exceptions: b,
                            textclips: k,
                            variables: d,
                            other: o,
                            rulecount: Math.max(p, ++c),
                            rules: JSON.stringify(v),
                            voice: it
                        })
                    }
                };
            t.onreadystatechange = i;
            t.open("GET", n.autoimport);
            t.setRequestHeader("cache-control", "max-age=0, no-cache, no-store");
            t.setRequestHeader("pragma", "no-cache");
            t.send()
        }
    })
}
var sExtName = chrome.runtime.getManifest().name,
    sBackup = "Backup - ",
    sMenuExeId = "cm_execute",
    sMenuTxtId = "cm_textclips",
    nFields = 0,
    nFilled = 0,
    nTimer = 0,
    aRules, portWiz;
chrome.browserAction.onClicked.addListener(showWizard);
chrome.contextMenus.onClicked.addListener(handleMenu);
chrome.runtime.onConnect.addListener(handleConnection);
chrome.runtime.onInstalled.addListener(init);
chrome.runtime.onMessage.addListener(handleMessage);
chrome.runtime.onStartup.addListener(handleStartup);
chrome.storage.onChanged.addListener(syncData);
chrome.webNavigation.onCommitted.addListener(handleNavigation);