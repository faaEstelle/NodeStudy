$(function () {
  var $login = $('.login')
  var $register = $('.register')

  $login.find('a').on('click', function () {
    $login.hide()
    $register.show()
  });
  $register.find('a').on('click', function () {
    $login.show()
    $register.hide()
  });

  //注册
  $register.find('button').on('click', function () {
    $.ajax({
      type: 'post',
      url: '/user/register',
      data: {
        username: $register.find('[name="username"]').val(),
        pwd: $register.find('[name="pwd"]').val()
      },
      dataType: 'json',
      success: function (result) {
        $register.find('.Info').html(result.message)

        if (!result.code) {
          //注册成功
          setTimeout(function () {
            $login.show()
            $register.hide()
          }, 1000)
        }
      }
    })
  });
  //登录
  $login.find('button').on('click', function () {
    $.ajax({
      type: 'post',
      url: '/user/login',
      data: {
        username: $login.find('[name="username"]').val(),
        pwd: $login.find('[name="pwd"]').val()
      },
      success: function (result) {
        if (result.code === 1) {
          $login.find('.Info').html(result.message)
        } else if (!result.code) {
          window.location.reload()
        }
      }
    })
  })

})