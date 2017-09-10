using Microsoft.AspNetCore.Mvc;

namespace PhotoGallery.Controllers
{
    public class SigninController: Controller
    {
        // GET: /<controller>/
        public IActionResult Index()
        {
            return View();
        }
    }
}
