function doMouseMove(n) {
    var i, r, t;
    return oCT && oCT.dragObject && (i = n.pageY - oCT.mouseOffset.y, i !== oCT.oldY && (r = i > oCT.oldY, oCT.oldY = i, t = oCT.findDropTargetRow(i - (oO.scale ? oCT.oldScrollTop - oCT.scrollObject.scrollTop : 0)), t && (r && oCT.dragObject !== t ? (oCT.dragObject.parentNode.insertBefore(oCT.dragObject, t.nextSibling), n.pageY > (oO.scale ? oCT.edgeBottom : H + oCT.scrollObject.scrollTop) ? oCT.timer || (oCT.timer = setInterval(function() {
        oCT.scrollObject.scrollBy(0, 40);
        oCT.scrollObject.scrollTop === oCT.maxScrollTop && (clearInterval(oCT.timer), oCT.timer = null)
    }, 50)) : (clearInterval(oCT.timer), oCT.timer = null)) : r || oCT.dragObject === t || (oCT.dragObject.parentNode.insertBefore(oCT.dragObject, t), n.pageY < (oO.scale ? oCT.edgeTop : oCT.scrollObject.scrollTop) ? oCT.timer || (oCT.timer = setInterval(function() {
        oCT.scrollObject.scrollBy(0, -40);
        oCT.scrollObject.scrollTop || (clearInterval(oCT.timer), oCT.timer = null)
    }, 50)) : (clearInterval(oCT.timer), oCT.timer = null))))), !1
}

function doMouseUp() {
    oCT && oCT.dragObject && (D.body.classList.remove("dragging"), oCT.dragObject.classList.remove("selected"), oCT.dragObject = null, clearInterval(oCT.timer), oCT.timer = null, oCT = null, err("fields") ? oErr.refresh() : disableButtons("fields", !1, !1), D.onmousemove = D.onmouseup = null)
}

function TableDnD() {
    this.dragObject = null;
    this.mouseOffset = null;
    this.table = null;
    this.oldY = 0;
    this.scrollObject = oO.scale ? oTB : D.documentElement;
    this.timer = null;
    this.init = function(n) {
        var i, t, r;
        for (this.table = n, i = n.tBodies[0].rows, t = 1, r = i.length; t < r; ++t) this.makeDraggable(i[t])
    };
    this.getPosition = function(n) {
        for (var t = 0, i = 0; n.offsetParent;) t += n.offsetLeft, i += n.offsetTop, n = n.offsetParent;
        return t += n.offsetLeft, i += n.offsetTop, {
            x: t,
            y: i
        }
    };
    this.makeDraggable = function(n) {
        if (n) {
            var t = this;
            n.onmousedown = function(n) {
                var i = n.target;
                return i.nodeName === "TEXTAREA" || i.nodeName === "INPUT" || i.nodeName === "SELECT" || i.nodeName === "BUTTON" ? !0 : (oCT = t, oCT.dragObject = this, oCT.mouseOffset = {
                    y: n.pageY - oCT.getPosition(this).y
                }, oCT.maxScrollTop = oCT.scrollObject.scrollHeight - (oO.scale ? oCT.scrollObject.offsetHeight : H), oO.scale && (oCT.edgeTop = oT.offsetTop, oCT.edgeBottom = D.getElementById("content-actionbar").offsetTop, oCT.oldScrollTop = oCT.scrollObject.scrollTop), D.body.classList.add("dragging"), oCT.dragObject.classList.add("selected"), D.onmousemove = doMouseMove, D.onmouseup = doMouseUp, !1)
            }
        }
    };
    this.findDropTargetRow = function(n) {
        for (var f = this.table.tBodies[0].rows, i = 1; i < f.length; ++i) {
            var t = f[i],
                r = this.getPosition(t).y,
                u = parseInt(t.offsetHeight) / 2;
            if (t.offsetHeight === 0 && (r = this.getPosition(t.firstChild).y, u = parseInt(t.firstChild.offsetHeight) / 2), n > r - u && n < r + u) return t
        }
        return null
    }
}
var oCT = null;