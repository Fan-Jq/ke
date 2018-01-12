var idealCourse = new Array(
    "世界宗教概论+周三第9,10,11节{第1-11周}"

    );
var selectedCourse = new Array();
var finish = false;
function sleep(numberMillis) {
    var now = new Date();
    var exitTime = now.getTime() + numberMillis;
    while (true) {
        now = new Date();
        if (now.getTime() > exitTime) {
            return 1;
        }
    }
}
function contain(arr, obj) {
    var i = arr.length;
    while (i--) {
        if (arr[i] === obj) {
            return true;
        }
    }
    return false;
}
function stand(t) {
    var nextline = "";
    nextline = t.split("，").join("");
    nextline = nextline.split("（").join("");
    nextline = nextline.split("）").join("");
    nextline = nextline.split("。").join("");
    nextline = nextline.split("“").join("");
    nextline = nextline.split("”").join("");
    nextline = nextline.split("　").join("");
    nextline = nextline.split(" ").join("");
    nextline = nextline.split("__").join("");
    nextline = nextline.split("_").join("");
    nextline = nextline.split(".").join("");
    nextline = nextline.split("？").join("");
    nextline = nextline.split("：").join("");
    nextline = nextline.split("(").join("");
    nextline = nextline.split(")").join("");
    nextline = nextline.split(":").join("");
    nextline = nextline.split("、").join("");
    nextline = nextline.split("；").join("");
    nextline = nextline.split(";").join("");
    nextline = nextline.split("《").join("");
    nextline = nextline.split("》").join("");
    nextline = nextline.split("．").join("");
    nextline = nextline.split("{").join("");
    nextline = nextline.split("}").join("");
    nextline = nextline.split("&nbsp").join("");
    nextline = nextline.split("{").join("");
    nextline = nextline.split("}").join("");
    nextline = nextline.split("[").join("");
    nextline = nextline.split("]").join("");
    nextline = nextline.split("【").join("");
    nextline = nextline.split("】").join("");
    nextline.replace("(\n|\r|(\r\n)|(\u0085)|(\u2028)|(\u2029))", "")
    return nextline;
}
function getElementbyinnerHTML(elements, content) {
    var isFound = false
    for (i = 0; i < elements.length; i++) {
        if (stand(elements[i].innerHTML) == stand(content)) {
            return elements[i];
            isFound = true;
        }
    }
    if (isFound == false) {
        return 0;
    }
}
function main() {
    sleep(2000);
    getElementbyinnerHTML(document.getElementsByTagName("a"), "全校性选修课").click();
    var a = document.getElementById("iframeautoheight").contentWindow;
    var PageSize = a.document.getElementById("dpkcmcGrid_txtPageSize");
    re();
    function re() {
        setTimeout(function () {
            a = document.getElementById("iframeautoheight").contentWindow;
            btnNextPage = a.document.getElementById("dpkcmcGrid_btnNextPage");
            if (btnNextPage == null) {
                re();
            } else {
                var PageSize = a.document.getElementById("dpkcmcGrid_txtPageSize");
                var selectedTable = a.document.getElementById("DataGrid2").getElementsByTagName("tr");
                for (i = 1; i < selectedTable.length; i++) {
                    selectedCourse.push(selectedTable[i].getElementsByTagName("td")[0].innerHTML);
                }
                var btnNextPage = a.document.getElementById("dpkcmcGrid_btnNextPage");
                PageSize.setAttribute("value", "100");
                btnNextPage.click();
                re2();
            }
        }, 1000)
    }

    function re2() {
        setTimeout(function () {
            a = document.getElementById("iframeautoheight").contentWindow;
            btnNextPage = a.document.getElementById("dpkcmcGrid_btnNextPage");
            if (a.document.getElementById("kcmcGrid") == null || a.document.getElementById("kcmcGrid").getElementsByTagName("input").length <= 15) {
                re2();
            } else {
                var avilableCourse = a.document.getElementsByTagName("a");
                var x = a.document.getElementById("kcmcGrid").getElementsByTagName("input");
                for (j = 0; j < idealCourse.length; j++) {
                    var result = getElementbyinnerHTML(avilableCourse, idealCourse[j].split("+")[0]);
                    if (result != 0) {
                        var courseTime = result.parentNode.parentNode.getElementsByTagName("td")[4].getAttribute("title");
                        if (courseTime == idealCourse[j].split("+")[1]) {
                            if (!contain(selectedCourse, idealCourse[j].split("+")[0])) {
                                var t = result.parentNode.parentNode.getElementsByTagName("input");
                                t[0].setAttribute("checked", "checked");
                            }
                        }
                    }
                }
                re3();
                function re3() {
                    setTimeout(function () {
                        var b = a.document.getElementById("Button1");
                        if (b == null) {
                            re3();
                        } else {
                            b.click();
                            setTimeout(function () {
                                document.location.reload();
                            }, 5000)
                        }
                    }, 1000)
                }
            }
        }, 1000)
    }
}
main();