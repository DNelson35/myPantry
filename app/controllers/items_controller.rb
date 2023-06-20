class ItemsController < ApplicationController

    # def create 
    #     item = Item.create!(item_params)

    #     render json: item, status: :created
    # end

    
    def create 
        item = @current_user.items.find_or_create_by(item_params)
        user_item = @current_user.user_items.find_by(item_id: item)
        user_item.update(user_item_params)

        render json: item,  status: :created
    end

    def show
        item = Item.find(params[:id])

        render json: item, status: :ok
    end

    def index 
        render json: Item.all, status: :ok
    end

    private

    def item_params
        params.permit(:name, :category, :image_url, :sku, :description)
    end

    def user_item_params
        params.permit(:experation_date, :quantity)
    end
end
