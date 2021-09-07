import { Component, HostListener, Input, OnInit } from '@angular/core';
import { shopeeService } from '../common/server/shopee.service';
import { HttpClient } from '@angular/common/http';
import { ORDER_CONSTANT } from "../common/constant/app.constant";

enum SortEnum {
  Relevancy = 'Phổ Biến',
  Newest = 'Mới Nhất',
  BestSeller = 'Bán Chạy'
};

@Component({
  selector: 'app-app-body',
  templateUrl: './app-body.component.html',
  styleUrls: ['./app-body.component.scss']
})
export class AppBodyComponent implements OnInit {
  orderConstants = ORDER_CONSTANT;
  order: string = this.orderConstants.Asc;
  sortTypeData = [
    {
      type: SortEnum[SortEnum.Relevancy],
      displayName: SortEnum.Relevancy,
      sortValue: 'relevancy'
    },
    {
      type: SortEnum[SortEnum.Newest],
      displayName: SortEnum.Newest,
      sortValue: 'ctime'
    },
    {
      type: SortEnum[SortEnum.BestSeller],
      displayName: SortEnum.BestSeller,
      sortValue: 'sales'
    }
  ];
  starArray = Array(5).fill(0).map((x, i) => i + 1);

  searchTerm = '';
  catId = '';
  categoryURL = '';
  sortValue = 'relevancy';
  priceSortValue  = 'price';

  shopeeData: any[] = [];
  shopeeCategoryData: any[] = [];

  pageSize = 60;
  currentPage = 1;
  pagesCount = 1;
  totalItems: number;
  
  isLoading = false;
  topPosToStartShowing = 1000;
  showMoveToTop:boolean;

  constructor(private _http: HttpClient) { }

  ngOnInit(): void {
    
    this.getDataCategories(() => this.getDataShopee()); 
    //vì JS chạy bất đồng bộ nên đặt getDataShopee vào trong dataCategory 
    //để nó chạy sau dataCate
  }

  // Tạo hàm chuẩn để xem search global hay category
  getData() {
    this.isLoading = true;
    if (!this.searchTerm && !this.catId) {
      this.getGlobalItems();
      return;
    }
    this.getDataShopee();
  }
  //Nhận searchTerm từ ô tìm kiếm
  receiveSearchTerm(value) {
    this.searchTerm = value;
    this.getData();
  }
  //Tạo URL 
  
  generateURL() {
    let catidQuery = this.catId ? `&match_id=${this.catId}` : '';
    let searchTermQuery = `&keyword=${this.searchTerm}`;
    let sortQuery = `&by=${this.sortValue}`;
    let orderQuery = `&order=${this.order}`
    const skip = this.pageSize * (this.currentPage - 1);
   
    return `https://shopee.vn/api/v4/search/search_items?${sortQuery}${searchTermQuery}&limit=${this.pageSize}&newest=${skip}${orderQuery}&page_type=search&scenario=PAGE_GLOBAL_SEARCH&version=2${catidQuery}`
  }

  getDataShopee() {
    const url = this.generateURL();
    this._http.get(url).subscribe((result: any) => {
      if (result && result.items) {
        this.shopeeData = result.items.map(detail => this.mapDataFromShopee(detail.item_basic));
        this.totalItems = result.total_count;
        this.calcPageQuantity();
      }
      this.isLoading = false;
    });
  }

  changePageNumber(pageNumber = 1) {
    if(pageNumber == this.currentPage || pageNumber < 1 || pageNumber > this.pagesCount) {
      return;
    }
    this.currentPage = pageNumber;
    this.getData();
  }

  calcPageQuantity() {
    this.pagesCount = Math.ceil(this.totalItems / (this.pageSize));
  }
  //nếu chỉ dùng getdatashopee thì khi vừa không có searchterm và catid thì k hiển thị gì cả.
  //Muốn hiển thị catid khi mới vào trang thì khi search chỉ search trong category => cần getGlobalItems
  getGlobalItems() {
    const skip = this.pageSize * (this.currentPage - 1);

    const url = `https://shopee.vn/api/v4/recommend/recommend?bundle=daily_discover_main&item_card=2&limit=${this.pageSize}&offset=${skip}`;

    this._http.get(url).subscribe((rs: any) => {
      const data = rs.data.sections[0].data.item;
      this.shopeeData = data.map(this.mapDataFromShopee);
      this.isLoading = false;
    });
  }

  //bỏ category để search GlobalItem
  unselectCategory() {
    this.catId = '';
    this.getData();
  }

// Data cứng từ category
  private getDataCategories(cb) {
    const rs = {"version":"b62248ac5316fd49173a0983e17d036a","data":{"category_list":[{"display_name":"Th\u1eddi Trang Nam","catid":11035567,"image":"687f3967b7c2fe6a134a2c11894eea4b","no_sub":false,"is_default_subcat":0,"block_buyer_platform":null},{"display_name":"Th\u1eddi Trang N\u1eef","catid":11035639,"image":"75ea42f9eca124e9cb3cde744c060e4d","no_sub":false,"is_default_subcat":0,"block_buyer_platform":null},{"display_name":"\u0110i\u1ec7n Tho\u1ea1i & Ph\u1ee5 Ki\u1ec7n","catid":11036030,"image":"31234a27876fb89cd522d7e3db1ba5ca","no_sub":false,"is_default_subcat":0,"block_buyer_platform":null},{"display_name":"M\u1eb9 & B\u00e9","catid":11036194,"image":"099edde1ab31df35bc255912bab54a5e","no_sub":false,"is_default_subcat":0,"block_buyer_platform":null},{"display_name":"Thi\u1ebft B\u1ecb \u0110i\u1ec7n T\u1eed","catid":11036132,"image":"978b9e4cb61c611aaaf58664fae133c5","no_sub":false,"is_default_subcat":0,"block_buyer_platform":null},{"display_name":"Nh\u00e0 C\u1eeda & \u0110\u1eddi S\u1ed1ng","catid":11036670,"image":"24b194a695ea59d384768b7b471d563f","no_sub":false,"is_default_subcat":0,"block_buyer_platform":null},{"display_name":"M\u00e1y T\u00ednh & Laptop","catid":11035954,"image":"c3f3edfaa9f6dafc4825b77d8449999d","no_sub":false,"is_default_subcat":0,"block_buyer_platform":null},{"display_name":"S\u1eafc \u0110\u1eb9p","catid":11036279,"image":"c765998fda99b2be9eb6e348df29af28","no_sub":false,"is_default_subcat":0,"block_buyer_platform":null},{"display_name":"M\u00e1y \u1ea2nh & M\u00e1y Quay Phim","catid":11036101,"image":"ec14dd4fc238e676e43be2a911414d4d","no_sub":false,"is_default_subcat":0,"block_buyer_platform":null},{"display_name":"S\u1ee9c Kh\u1ecfe","catid":11036345,"image":"bf87b50b463f646bb7fb8a1a606d9ed2","no_sub":false,"is_default_subcat":0,"block_buyer_platform":null},{"display_name":"\u0110\u1ed3ng H\u1ed3","catid":11035788,"image":"86c294aae72ca1db5f541790f7796260","no_sub":false,"is_default_subcat":0,"block_buyer_platform":null},{"display_name":"Gi\u00e0y D\u00e9p N\u1eef","catid":11035825,"image":"48630b7c76a7b62bc070c9e227097847","no_sub":false,"is_default_subcat":0,"block_buyer_platform":null},{"display_name":"Gi\u00e0y D\u00e9p Nam","catid":11035801,"image":"74ca517e1fa74dc4d974e5d03c3139de","no_sub":false,"is_default_subcat":0,"block_buyer_platform":null},{"display_name":"T\u00fai V\u00ed N\u1eef","catid":11035761,"image":"fa6ada2555e8e51f369718bbc92ccc52","no_sub":false,"is_default_subcat":0,"block_buyer_platform":null},{"display_name":"Thi\u1ebft B\u1ecb \u0110i\u1ec7n Gia D\u1ee5ng","catid":11036971,"image":"7abfbfee3c4844652b4a8245e473d857","no_sub":false,"is_default_subcat":0,"block_buyer_platform":null},{"display_name":"Ph\u1ee5 Ki\u1ec7n & Trang S\u1ee9c N\u1eef","catid":11035853,"image":"8e71245b9659ea72c1b4e737be5cf42e","no_sub":false,"is_default_subcat":0,"block_buyer_platform":null},{"display_name":"Th\u1ec3 Thao & Du L\u1ecbch","catid":11035478,"image":"6cb7e633f8b63757463b676bd19a50e4","no_sub":false,"is_default_subcat":0,"block_buyer_platform":null},{"display_name":"B\u00e1ch H\u00f3a Online","catid":11036525,"image":"c432168ee788f903f1ea024487f2c889","no_sub":false,"is_default_subcat":0,"block_buyer_platform":null},{"display_name":"\u00d4 T\u00f4 & Xe M\u00e1y & Xe \u0110\u1ea1p","catid":11036793,"image":"3fb459e3449905545701b418e8220334","no_sub":false,"is_default_subcat":0,"block_buyer_platform":null},{"display_name":"Nh\u00e0 S\u00e1ch Online","catid":11036863,"image":"36013311815c55d303b0e6c62d6a8139","no_sub":false,"is_default_subcat":0,"block_buyer_platform":null},{"display_name":"Balo & T\u00fai V\u00ed Nam","catid":11035741,"image":"18fd9d878ad946db2f1bf4e33760c86f","no_sub":false,"is_default_subcat":0,"block_buyer_platform":null},{"display_name":"Th\u1eddi Trang Tr\u1ebb Em","catid":11036382,"image":"4540f87aa3cbe99db739f9e8dd2cdaf0","no_sub":false,"is_default_subcat":0,"block_buyer_platform":null},{"display_name":"\u0110\u1ed3 Ch\u01a1i","catid":11036932,"image":"ce8f8abc726cafff671d0e5311caa684","no_sub":false,"is_default_subcat":0,"block_buyer_platform":null},{"display_name":"Gi\u1eb7t Gi\u0169 & Ch\u0103m S\u00f3c Nh\u00e0 C\u1eeda","catid":11036624,"image":"cd8e0d2e6c14c4904058ae20821d0763","no_sub":false,"is_default_subcat":0,"block_buyer_platform":null},{"display_name":"Ch\u0103m S\u00f3c Th\u00fa C\u01b0ng","catid":11036478,"image":"cdf21b1bf4bfff257efe29054ecea1ec","no_sub":false,"is_default_subcat":0,"block_buyer_platform":null},{"display_name":"Voucher & D\u1ecbch V\u1ee5","catid":11035898,"image":"b0f78c3136d2d78d49af71dd1c3f38c1","no_sub":false,"is_default_subcat":0,"block_buyer_platform":null}]},"error_msg":null,"error":null};

    if (rs && rs.data && rs.data.category_list) {
      this.shopeeCategoryData = rs.data.category_list;
      this.catId = this.shopeeCategoryData[0].catid;
    }
    if (cb) {
      cb()
    }
    return;

    this._http.get('https://shopee.vn/api/v2/category_list/get').subscribe((rs: any) => {
      if (rs && rs.data && rs.data.category_list) {
        this.shopeeCategoryData = rs.data.category_list;
        this.catId = this.shopeeCategoryData[0].catid;
      }
      if (cb) {
        cb()
      }
    })
  }

  //Đổi màu category khi được chọn
  onChangeCatid(catId) {
    this.catId = catId;
    this.getData();
  }

  sortItems(sortValue, order) {
    this.sortValue = sortValue;
    this.order = order;
    this.getData();
  }

  //changePage để tính toán số lượng take và skip
  mapDataFromShopee(data) {
    return {
      name: data.name,
      image: `https://cf.shopee.vn/file/${data.image}`,
      price: data.price.toString().slice(0, -5),
      brand: data.brand,
      liked: data.liked,
      ctime: data.ctime,
      itemId: data.itemid,
      discount: data.discount,
      shop_location: data.shop_location,
      historical_sold: data.historical_sold,
      rating: Math.floor(data.item_rating.rating_star),
      price_before_discount: data.price_before_discount.toString().slice(0, -5),
    }
  }

  scrollToTop(event) {
    window.scroll({
      top: 0, 
      left: 0,
      behavior: 'smooth',
    });
  }

  @HostListener('window:scroll')
  checkScroll() {
    const scrollPosition = window.pageYOffset || 0;
    this.showMoveToTop = scrollPosition >= this.topPosToStartShowing;
  }
}