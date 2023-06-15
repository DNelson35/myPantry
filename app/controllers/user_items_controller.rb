class UserItemsController < ApplicationController

    def index 
        user_items = @current_user.user_items.all

        render json: user_items, status: :ok
    end

    def show 
        user_item = find_user_item

        render json: user_item, status: :found
    end

    def create 
        user_item = UserItem.create(user_item_params)

        render json: user_item, status: :created
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

    def user_item_params
        params.permit(:user_id, :item_id, :experation_date, :quantity)
    end
end
