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
        if (now.getTime() > exitTime)
            return;
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
function setPage() {
    setTimeout(function () {
        var a = document.getElementById("iframeautoheight").contentWindow;
        var x = a.document.getElementById("dpkcmcGrid_txtPageSize");
        var y = a.document.getElementById("dpkcmcGrid_btnNextPage");

        if (x != null) {
            x.setAttribute("value", "100");
            y.click();
            // seekCourse();
            return 1;
        } else {
            sleep(500);
            setPage();
        }
    }, 300);
}
function getSelectedCourse() {
    setTimeout(function () {
        var a = document.getElementById("iframeautoheight").contentWindow;
        if (a.document.getElementById("DataGrid2") != null) {
            var selectedTable = a.document.getElementById("DataGrid2").getElementsByTagName("tr");
            for (i = 1; i < selectedTable.length; i++) {
                selectedCourse.push(selectedTable[i].getElementsByTagName("td")[0].innerHTML);
            }
        } else {
            sleep(1000);
            getSelectedCourse();
        }
    }, 300);
}
function seekCourse() {
    var a = document.getElementById("iframeautoheight").contentWindow;
    var avilableCourse = a.document.getElementsByTagName("a");
    setTimeout(function () {
        try {
            var x = a.document.getElementById("kcmcGrid").getElementsByTagName("input");
        } catch (err) {
            sleep(500);
            seekCourse();
        }
        if (x.length > 15) {
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
            var b = a.document.getElementById("Button1");
            while (b == null) {
                sleep(500)
            }
            b.click();
            finish = true;
            setTimeout(function re() {
                if (finish) {
                    finish = false;
                    document.location.reload();
                }
            }, 5000);
        } else {
            sleep(500);
            seekCourse();
        }
    }, 300)
}

function main() {
    getElementbyinnerHTML(document.getElementsByTagName("a"), "全校性选修课").click();
    setPage();
    getSelectedCourse();
    seekCourse();

}
main();
/*try{
          var b = a.document.getElementById("dpkcmcGrid_btnNextPage");
      } catch (e) {
          setTimeout(function () {
              var b = a.document.getElementById("dpkcmcGrid_btnNextPage");
          }, 2000)
      }
      while (b == null) {
          setTimeout(function () { }, 1000);
      }
      b.click();
      getSelectedCourse();
      seekCourse();
  }, 5000)
} else {
  seekCourse();
}*/