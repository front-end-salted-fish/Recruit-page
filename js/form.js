// 表单模块
!(() => {
    // 获取表单元素
    const $formPages = $('#form-page');
    const $formPageOne = $('#form-page-one');
    const $formPageTwo = $('#form-page-two');
    const $username = $('[name=username]');
    const $studentId = $('[name=student-id]');
    const $gradeProfessional = $('[name=grade-professional]');
    const $radio = $('.x-radio');
    const $nextStep = $('.next-step'); // 下一步按钮
    const $submit = $('.submit'); // 提交按钮
    const $preStep = $('.pre-step'); // 上一步按钮
    const $number = $('[name=number]');
    const $email = $('[name=email]');
    const $introduction = $('[name=introduction]');
    const $direction = $('[name=direction]');
    const $option = $('.x-dropdown'); // 获取下拉框
    const $options = $('.x-dropdown-item'); // 获取下拉框的值
    const $skills = $('[name=skills]');
    const $idea = $('[name=idea]');
    // const $triggerBtn = $('.fui_trigger-btn'); // 单选框按钮
    const $triggerBtn = $('.fui_combo'); // 单选框按钮
    
    var particles = new Particles('#btn');
    $("#btn").click(function() {
        // Disintegrate the button into particles
        //启动粒子特效
        particles.disintegrate();
    
        // would do the opposite
        //设置四秒后恢复
        setTimeout(function() {
            particles.integrate();
        }, 4000);
    })

    
    // $(".Btn").on('click', function() {
    // particles.integrate(); 
    // })
    let formData = {
        username: '',
        studentId: '',
        gradeProfessional: '',
        sex: '',
        number: '',
        email: '',
        introduction: '',
        direction: '',
        skills: '',
        idea: ''
    };
    // 使用事件委托监听输入框的失去焦点事件
    $formPages.on('blur', 'input', function (ev) {
        let match = $(ev.target).attr('name');
        let value = $(ev.target).val();
        switch (match) {
            case "username":
                formData.username = value;
                break;
            case "student-id":
                formData.studentId = value;
                break;
            case "grade-professional":
                formData.gradeProfessional = value;
                break;
            case "username":
                formData.sex = value;
                break;
            case "number":
                formData.number = value;
                break;
            case "email":
                formData.email = value;
                break;
            default:
                break;

        }

    })
    // 使用事件委托监听文本域的失去焦点事件
    $formPages.on('blur', 'textarea', function (ev) {
        let match = $(ev.target).attr('name');
        let value = $(ev.target).val();
        switch (match) {
            case "introduction":
                formData.introduction = value;
                break;
            case "idea":
                formData.idea = value;
                break;
            case "skills":
                formData.skills = value;
                break;
            default:
                break;

        }
        console.log(formData)

    })
    // 给表单绑定单击函数，使下拉框消失
    $formPages.on('click', function (ev) {
        $option.fadeOut(100);
    })
    // 给性别单选按钮绑定单击响应函数
    $radio.on('click', function (ev) {
        let sex = $(this).attr('value');
        $(this).children()[0].style.background = '#07190e80';
        $(this).first().siblings().children()[0].style.background = '#fff';
        formData.sex = sex;
    })
    // 给下一步按钮按钮绑定单击响应函数
    $nextStep.on('click', function () {
        $formPageOne.hide();
        $formPageTwo.fadeIn();
    })
    // 给上一步按钮按钮绑定单击响应函数
    $preStep.on('click', function () {
        $formPageOne.fadeIn();
        $formPageTwo.hide();
    })
    // 给单选框按钮绑定点击函数
    $triggerBtn.on('click', function (ev) {
        $option.slideToggle(100);
        ev.stopPropagation()
    })
    $option.on('click', function (ev) {
        $direction.val($(ev.target).text());
        formData.direction = $(ev.target).text();
    })
    // $submit.on('click', function () {
    //     console.log(formData)
    // })
    function commonInfo(reg, id) {
        let inputText = document.getElementById(id);
        let inputValue = inputText.value;
        let inputSpan = document.getElementById(id + "Span");
            if (!reg.test(inputValue)) {
                inputSpan.innerHTML = "格式有误！";
                inputSpan.style.color = "red";
                inputSpan.style.background = "none";
                return false;
            } else {
                inputSpan.innerHTML = "";
                return true;
            }   
    }
        /*验证手机号 */
    function checkNumber() {
        let reg = /^[1][0-9]{10}$/ig; /* 验证手机号 */
        let id = 'Number';
        
        return commonInfo(reg, id);
    }

})();


