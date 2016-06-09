class Api::SessionsController < ApplicationController

  def create

    if auth_hash
      @user = User.find_or_create_from_auth_hash(auth_hash)
      self.current_user = @user
      redirect_to '/'
    else
      @user = User.find_by_credentials(
        params[:user][:username],
        params[:user][:password]
      )

      if @user
        login_user!(@user)
        render "api/users/show"
      else
  			render(
          json: {
            base: ["Invalid username/password combination"]
          },
          status: 401
        )
  		end

    end
  end

  def destroy
    @user = current_user
    if @user
      logout
      render "api/users/show"
    else
      render json: { base: ["Nobody signed in!"] , status: 404 }
    end
  end

  def show
    if current_user
      @user = current_user
      render "api/users/show"
    else
      render json: {}
    end
  end

  private

  def auth_hash
    request.env['omniauth.auth']
  end

end
