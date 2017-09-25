$(function () {
  var $login = $('.login')
  var $register = $('.register')

  $login.find('a').on('click', function () {
    $login.hide()
    $register.show()
  })
  $register.find('a').on('click', function () {
    $login.show()
    $register.hide()
  })

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
        console.log(result)
      }
    })
  })

})