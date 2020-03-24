require 'pry'

class EventsController < ApplicationController
  def index
    @events = Event.order('eventDate DESC')
    render json: @events
  end

  def create
    @event = Event.create!(event_params)
    render json: @event
  end

  def show
    @event = Event.find(params[:id])
    render json: @event
  end

  def event_params 
    params.require(:event).permit(:eventName, :eventDate, :eventOwner, :eventLocation, :eventDescription, :eventCoverImage)
  end
end
