class UserItemsController < ApplicationController

    def index 
        user_items = @current_user.user_items.all

        render json: user_items, status: :ok
    end

    def show 
        user_item = find_user_item

        render json: user_item, status: :found
    end

    # def create 
    #     user_item = UserItem.create(user_item_params)

    #     render json: user_item, status: :created
    # end

    def create 
        item = Item.find_by(name: params[:name])
        if item
            user_item = @current_user.user_items.create!(item_id: item.id)
            user_item.update!(user_item_params)
            render json: user_item, status: :created
        else
            new_item = @current_user.items.create(item_params)
            user_item = @current_user.user_items.find_by(item_id: new_item.id)
            user_item.update(user_item_params)
            render json: user_item, status: :created
        end
    end



    def destroy
        user_item = find_user_item

        user_item.destroy

        head :no_content
    end



    private

    def find_user_item
        UserItem.find(params[:id])
    end

    def item_params
        params.permit(:name, :category, :image_url, :sku, :description)
    end

    def user_item_params
        params.permit(:experation_date, :quantity)
    end

end
