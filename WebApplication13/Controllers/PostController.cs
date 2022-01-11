using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication13.Entities;
using WebApp.Models;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Linq;
using WebApplication13.ViewModels;

namespace WebApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PostController : ControllerBase
    {

        private readonly ILogger<PostController> _logger;
        private static ClinicDBContext _dBContext;
        private CategoryModel _categoryModel;
        private PostModel _postModel;
        public PostController(ILogger<PostController> logger)
        {
            _logger = logger;
            _dBContext = new ClinicDBContext(new DbContextOptions<ClinicDBContext>());
            _categoryModel = new CategoryModel(_dBContext);
            _postModel = new PostModel(_dBContext);
        }


        [HttpGet]
        public IEnumerable<Post> Get()
        {
            return _dBContext.Posts.Include(p => p.Category).ToArray();
        }


        // https://localhost:44394/Post/3/2/0 
        // page=3 limit=2 categoryId=0 
        [HttpGet("{page}/{limit}/{categoryId}")]
        public IEnumerable<Post> Get(int page, int limit, int categoryId) //TODO добавить categoryId
        {
            // return _dBContext.Posts.Include(p => p.Category).ToArray();
            if (categoryId == 0)
            {
                return _dBContext.Posts.Include(p => p.Category)
                .OrderBy(p => p.Id)
                .Skip((page - 1) * limit)
                .Take(limit).ToArray();
            }

            return _dBContext.Posts.Include(p => p.Category)
                .Where(p => p.CategoryId == categoryId)
                .OrderBy(p => p.Id)
                .Skip((page - 1) * limit)
                .Take(limit).ToArray();
        }


        // https://localhost:44394/post/count?categoryId=2
        [HttpGet("count")]
        public int Get(int categoryId)
        {
            if (categoryId == 0)
            {
                return _dBContext.Posts.Count();
            }
            return _dBContext.Posts
                   .Where(p => p.CategoryId == categoryId)
                   .Count();
        }


        //// -----------   ТРИ В ОДНОМ  ---------------------------
        //// https://localhost:44394/Post/3/2/0 
        //// page=3 limit=2 categoryId=0 
        //[HttpGet("{page}/{limit}/{categoryId}")]
        //public PostsViewModel Get(int page, int limit, int categoryId) 
        //{
        //    IEnumerable<Post> posts = null;          
        //    if (categoryId == 0)
        //    {
        //        posts = _dBContext.Posts.Include(p => p.Category)
        //                    .OrderBy(p => p.Id)
        //                    .Skip((page - 1) * limit)
        //                    .Take(limit).ToArray();
        //    }
        //    else
        //    {
        //        posts = _dBContext.Posts.Include(p => p.Category)
        //                   .Where(p => p.CategoryId == categoryId)
        //                   .OrderBy(p => p.Id)
        //                   .Skip((page - 1) * limit)
        //                   .Take(limit).ToArray();
        //    }

        //    IEnumerable<Category> categories = _dBContext.Categories.ToArray();

        //    int count = 0;
        //    if (categoryId == 0)
        //    {
        //        count = _dBContext.Posts.Count();
        //    }
        //    else
        //    {
        //        count = _dBContext.Posts
        //           .Where(p => p.CategoryId == categoryId)
        //           .Count();
        //    }

        //    return new PostsViewModel
        //    {
        //        Posts = posts,
        //        Categories = categories,
        //        Count = count
        //    };
        //}



    }
}
