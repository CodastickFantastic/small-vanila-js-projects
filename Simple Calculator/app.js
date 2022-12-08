window.onload = function() {
    calculatorApp.init()
}

let calculatorApp = {
    calcBtn: Array.from(document.getElementsByTagName("button")),
    calcSum: document.querySelector("#input"),
    calcInput: null,
    bracket: "close",

    init: function(){
        this.calcBtn.forEach(button => {
            button.addEventListener("click", () => {
                this.calcOperation(button)
            })
        })
    },

    calcOperation: function(button) {
        switch(button.innerHTML){
            case "C":
                this.calcSum.innerHTML = ""
                break
            case "=":
                this.evaluate()
                break
            case "↚":
                this.removeLast()
                break
            case "()":
                this.brackets()
                break
            default:
                this.insertNumber(button)
                break
        }
    },

    insertNumber: function(button) {
        let value = button.innerHTML
        this.calcSum.innerHTML += value
    },

    removeLast: function(){
        let removed = this.calcSum.innerHTML.slice(0, -1)
        this.calcSum.innerHTML = removed
    },

    evaluate: function(){
        let stringToSum = this.calcSum.innerHTML
        let sum = math.evaluate(stringToSum)
        this.calcSum.innerHTML = sum
    },

    brackets: function(){
        if(this.bracket == "close"){
            this.calcSum.innerHTML += "("
            this.bracket = "open"
        } else {
            this.calcSum.innerHTML += ")"
            this.bracket = "close"
        }
    }
       
}