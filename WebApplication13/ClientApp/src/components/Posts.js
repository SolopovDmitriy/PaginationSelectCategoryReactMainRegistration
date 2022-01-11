import React, { Component } from 'react';
import { render } from 'react-dom';
import ReactPaginate from 'react-paginate';
import './Posts.css';



export class Posts extends Component {

    constructor(props) {
        super(props);
        this.state = { // поля класса Posts, кторые будут динамически меняться      
            categories: [],                 //уникальные категории - получаем из категорий контроллера
            filteredPosts:[],               //посты с учетом фильтра
            loading: true,
            countPosts: 0,                  // количество всех постов (котов)
            totalPages: 0,                   // количество всех страниц
            currentCategoryId: 0,
            currentPage : 1
        };
        this.handlePageClick = this.handlePageClick.bind(this);
        this.handleChangeCategories = this.handleChangeCategories.bind(this);       
        this.itemsPerPage = 100; // количество постов (котов) на странице  
    }


    componentDidMount() {
        this.populatePostsData();
    }

        
    handleChangeCategories = (event) => {
        console.log(this.state)
        const categoryId = event.target.value;
        const currentPage = 1;
        this.populatePostsData(currentPage, this.itemsPerPage, categoryId);       
    }
   

    handlePageClick = (event) => { // обработчик события изменения номера страницы в pagination
        console.log(`page = ${event.selected + 1} and pageLimit = ${this.itemsPerPage} `); // page = 2 and pageLimit = 2    
        //event.selected - номер страницы (нумерация с нуля), this.itemsPerPage - количество постов на одной странице одно и то же pagelimite
        this.populatePostsData(event.selected + 1, this.itemsPerPage, this.state.currentCategoryId); // this.populatePostsData - обращается к контролеру и получает о него посты и отображает их на странице
    };


    renderPostsCards(posts, categories) {
        return (
            <div className='container'>

                <nav aria-label="Page navigation comments" className="mt-4">
                    <ReactPaginate
                        forcePage={this.state.currentPage - 1}
                        previousLabel="previous"
                        nextLabel="next"
                        breakLabel="..."
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        pageCount={this.state.totalPages}
                        pageRangeDisplayed={10}
                        marginPagesDisplayed={2}
                        onPageChange={this.handlePageClick}
                        containerClassName="pagination justify-content-center"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        activeClassName="active"
                        // eslint-disable-next-line no-unused-vars
                        hrefBuilder={(page, pageCount, selected) =>
                            page >= 1 && page <= pageCount ? `/page/${page}` : '#'
                        }
                        hrefAllControls
                     
                        onClick={(clickEvent) => {
                            console.log('onClick', clickEvent);
                            // Return false to prevent standard page change,
                            // return false; // --> Will do nothing.
                            // return a number to choose the next page,
                            // return 4; --> Will go to page 5 (index 4)
                            // return nothing (undefined) to let standard behavior take place.
                        }}
                    />
                </nav>

                <div className="row m-3">
                    <div className="col-md-6"></div>
                    <div className="col-md-6">
                        <select className="form-control" onChange={this.handleChangeCategories}>
                            <option key={0} value={0}>Все посты</option>
                            {categories.map(elem => 
                                <option key={elem.id} value={elem.id}>{elem.title}</option>
                                )}
                        </select>
                    </div>
                </div> 
                <div className='row'>
                    {posts.map(category =>
                        <div className="mb-2 col-md-4 " key={category.id}>
                            <div className="card pt-3" >
                                <div className=''>
                                    <img className="card-img-top" src={category.imgSrc} alt={category.imgAlt} />
                                    <div className="card-body">
                                        <h5 className="card-title text-center">{category.title}</h5>
                                        <p className="card-text text-justify">{category.slogan}</p>
                                        <div className="form-row text-center">
                                            <div className="col-12 text-white">
                                                <a href={"/showOneCategory/" + category.urlSlug} className="btn btn-primary">Подробнее...</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderPostsCards(this.state.filteredPosts, this.state.categories);
        return (
            <div>
                <h1 id="tabelLabel" className='text-center'>Все Посты</h1>
                <p className='text-center'>Чтото там.....</p>
                {contents}
            </div>
        );
    }



    async populatePostsData(currentPage = 1, pageLimit = 2, categoryId = 0) {
        
        // https://localhost:44394/Post/3/2/0
        let url = `Post/${currentPage}/${pageLimit}/${categoryId}`;        // let url = `Post/1/3/0` Post это контроллер
        console.log(`fetch url in populatePostsData: ${url}`);
        const responsePages = await fetch(url);// делает запрос по адресу url
        const dataPages = await responsePages.json();
        console.log(`responsePages.json():`);
        console.log(dataPages);

        // https://localhost:44394/post/count?categoryId=2
        const responseCount = await fetch(`post/count?categoryId=${categoryId}`); // делает запрос по адресу url, количество всех постов по данной категории
        const dataCount = await responseCount.json(); // dataCount = 25, например, для категории = 0, количество всех постов
        const _totalPages = Math.ceil(dataCount / this.itemsPerPage); // _totalPages = 13, количество страниц       
        console.log(`responseCount.json():`);
        console.log(dataCount);

        // https://localhost:44394/category
        const responseCategories = await fetch(`category`);
        const dataCategories = await responseCategories.json();
        console.log(`dataCategories:`);
        console.log(dataCategories);
        console.log(dataCategories[0].title);
              
        // сохраняем в переменные в State
        this.setState({
            categories: dataCategories,
            filteredPosts: dataPages,
            loading: false,
            countPosts: dataCount,
            totalPages: _totalPages,
            currentCategoryId: categoryId,
            currentPage: currentPage
        });            
    }
}

