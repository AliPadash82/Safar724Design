import React from 'react'
import "../assets/css/positivePoints.css"
import CardWithIconVerticall from './CardWithIconVerticall'

const PositivePoints = () => {
    return (
        <div className="positive-points">
            <h1>چرا 11,332,785 نفر</h1>
            <h4>برای خرید بلیط اتوبوس به ما اعتماد کرده‌اند؟</h4>
            <div className='seperator-line-pp' />
            <p>سامانه سفر ۷۲۴ با ارائه لیست متنوع سرویس‌ها، امکان خرید فوری بلیت اتوبوس از شرکت ها و تعاونی های مسافربری را بدون نیاز به عضویت در سایت فراهم کرده است. ویژگی هایی چون مشاهده‌ نوع اتوبوس و تصاویر آن در کنار قابلیت رزرو صندلی دلخواه، به شما اجازه می‌دهد تا آگاهانه مسافرت خود را برای هر نقطه از کشور برنامه‌ریزی کنید.</p>
            <div className='cards-pp'>
                <CardWithIconVerticall title='پشتیبانی صمیمی' icon='headphone'>نگران هیچ مشکلی نباشید! چه در مورد ساعت حرکت و یا عدم دریافت اس ام اس و هر مشکل دیگری، تیم پشتیبانی ما آماده است تا شما را از طریق تلفن یا به صورت آنلاین راهنمایی کند.</CardWithIconVerticall>
                <CardWithIconVerticall title='شرکت های معتبر و پایانه های ایران در یکجا' icon='diamond'>از سیر و سفر و میهن نور تا عدل و رویال سفر؛ از ولوو تا اسکانیا و مان؛ از صندلی های وی آی پی (Vip) و تخت شو تا تک صندلی و معمولی؛ همگی و همگی در اختیار شما خواهند بود تا به صورت آنلاین و یا تلفنی خیلی راحت بلیط اتوبوس دلخواهتان را رزرو و  خریداری نمایید.</CardWithIconVerticall>
                <CardWithIconVerticall title='تخفیف ها و قیمت های ویژه' icon='discount'>با سفر ۷۲۴ می توانید قیمت ها و تخفیف های شرکت های مسافربری را مقایسه کنید و بلیط های اتوبوس ارزان و با کیفیت را در ساعت ها و مسیرهای دلخواه تان به راحتی انتخاب و رزرو نمایید.</CardWithIconVerticall>
                <CardWithIconVerticall title='روش های خرید متنوع' icon='basket'>بستر امن سفر ۷۲۴ امکان رزرو و خرید آنلاین بلیط اتوبوس از طریق سایت و اپلیکیشن، در کنار فروش و رزرو تلفنی بلیط اتوبوس از پایانه های کشور را در اختیار شما قرار داده است.</CardWithIconVerticall>
            </div>
        </div>
    )
}

export default PositivePoints